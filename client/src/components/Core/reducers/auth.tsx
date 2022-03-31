import { setPendingRequest } from '../../../utils/api';
import {
    USER_LOADED,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    ACCOUNT_DELETED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT,
    SET_LANG,
} from '../actions/types';

const initialState = {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    rememberMe: localStorage.getItem('rememberMe') === 'true',
    loading: true,
    user: localStorage.getItem('accessToken') ? { email: localStorage.getItem('email') } : null,
    lang: localStorage.getItem('locale'),
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.data,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('accessToken', payload.token);
            if (payload.rememberMe) localStorage.setItem('refreshToken', payload.refresh_token);
            localStorage.setItem('rememberMe', payload.rememberMe);
            localStorage.setItem('email', payload.email);
            return {
                ...state,
                rememberMe: !!payload.rememberMe,
                email: payload.email,
                user: {
                    email: payload.email,
                },
                isAuthenticated: true,
                loading: false,
            };
        case SET_LANG:
            localStorage.setItem('locale', payload);
            return {
                ...state,
                lang: payload,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
        case ACCOUNT_DELETED:
            setPendingRequest(0);
            localStorage.removeItem('locale');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('email');
            localStorage.setItem('timezone', '00:00');
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
                email: null,
            };
        default:
            return state;
    }
}
