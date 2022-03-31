import api from '../../../utils/api';
import { setAlert } from './alert';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_LANG } from './types';

// LOGIN USER
export const login = (email, password, rememberMe, history) => async (dispatch) => {
    const body = JSON.stringify({ email, password });
    try {
        const res = await api.post('/auth/login', body);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                ...res.data,
                email,
                rememberMe,
            },
        });

        history.push('/');
    } catch (err) {
        const error = err.response ? err.response.data : err || null;
        if (error) dispatch(setAlert(error.message, 'error'));

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const register = (email, password, passwordVerify, history) => async (dispatch) => {
    const body = JSON.stringify({ email, password, passwordVerify });
    try {
        const res = await api.post('/auth', body);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                ...res.data,
                email,
            },
        });

        history.push('/');
    } catch (err) {
        const error = err.response ? err.response.data : err || null;
        if (error) dispatch(setAlert(error.message, 'error'));

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const logout = () => async (dispatch) => {
    await api.get('/auth/logout');
    dispatch({
        type: LOGOUT,
    });
};

export const setLang = (lang) => (dispatch) => {
    dispatch({
        type: SET_LANG,
        payload: lang,
    });
};

export const accessDenied = (history) => {
    setAlert('Access Denied', 'error');
    history.push('/403');
};
