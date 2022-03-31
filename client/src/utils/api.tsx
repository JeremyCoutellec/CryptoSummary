import axios, { AxiosRequestConfig } from 'axios';

import last from 'lodash/last';
import split from 'lodash/split';
import isEqual from 'lodash/isEqual';
import startsWith from 'lodash/startsWith';
import replace from 'lodash/replace';
import includes from 'lodash/includes';

export const uriToId = (uri) => last(split(uri, '/'));

const { REACT_APP_WEB_API_URL, REACT_APP_WEB_API_PATH, REACT_APP_WEB_TIMEOUT, REACT_APP_WEB_MAX_CONCURRENT_REQUEST } = process.env;

const MAX_CONCURRENT_REQUESTS = parseInt(REACT_APP_WEB_MAX_CONCURRENT_REQUEST) ?? 6;
const INTERVAL_MS = 10;

export let PENDING_REQUESTS = 0;
export const setPendingRequest = (value) => (PENDING_REQUESTS = value);

// API use axios
const api = axios.create();

/**
 * Intercept all the request to add url of the env.
 * Add the content type by method
 */
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.timeout = parseInt(REACT_APP_WEB_TIMEOUT) ?? 10000;

        /**
         * Add the REACT_APP_WEB_API_PATH url if needed
         * Change this if the app use more than one api
         */
        config.url = replace(config.url, REACT_APP_WEB_API_URL, '');
        if (!startsWith(config.url, REACT_APP_WEB_API_PATH)) config.url = REACT_APP_WEB_API_PATH + config.url;
        config.url = REACT_APP_WEB_API_URL + config.url;

        /**
         * Change the content type, depends on the method call
         */
        if (isEqual(config.method, 'patch')) config.headers.patch['Content-Type'] = 'application/merge-patch+json';

        if (isEqual(config.method, 'post')) config.headers.post['Content-Type'] = 'application/json';

        if (isEqual(config.method, 'put')) config.headers.put['Content-Type'] = 'application/json';

        /**
         * Return a new promise only if the pending request are less than the max concurrent request
         */
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (PENDING_REQUESTS < MAX_CONCURRENT_REQUESTS) {
                    const accessToken = localStorage.getItem('accessToken');
                    const refreshToken = localStorage.getItem('refreshToken');

                    // Add the bearer token on headers for all the call api
                    if (accessToken && accessToken !== '') config.headers['Authorization'] = 'Bearer ' + accessToken;

                    // Resolve the promise only if there is an accessToken or if the promise target a connection route
                    if (
                        accessToken ||
                        refreshToken ||
                        includes(
                            [
                                REACT_APP_WEB_API_URL + REACT_APP_WEB_API_PATH + '/connexion/refresh',
                                REACT_APP_WEB_API_URL + REACT_APP_WEB_API_PATH + '/connexion',
                            ],
                            config.url
                        )
                    ) {
                        PENDING_REQUESTS++;
                        clearInterval(interval);
                        resolve(config);
                    }
                }
            }, INTERVAL_MS);
        });
    },
    (error) => {
        Promise.reject(error);
    }
);

//response interceptor to refresh token on receiving token expired error
api.interceptors.response.use(
    (response) => {
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken');

        // If the error is 401 check the refreshtoken
        if (refreshToken && error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // Call the refresh token to get a new accessToken
            return axios
                .post(REACT_APP_WEB_API_PATH + '/connexion/refresh', {
                    refresh_token: refreshToken,
                })
                .then((res) => {
                    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
                    if (res?.status === 200) {
                        localStorage.setItem('accessToken', res.data.token);
                        localStorage.setItem('refreshToken', res.data.refresh_token);

                        // Send the original request with now a new accessToken
                        return api(originalRequest);
                    }
                })
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                });
        }
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);

        return Promise.reject(error);
    }
);

export default api;
