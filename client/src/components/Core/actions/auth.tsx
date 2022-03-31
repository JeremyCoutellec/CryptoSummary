import api from '../../../utils/api';
import { setAlert } from './alert';
import { loadUser } from '../../UserBundle/actions/user';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_LANG } from './types';

const { REACT_APP_WEB_API_PATH } = process.env;

// LOGIN USER
export const login = (email, password, rememberMe, history) => async (dispatch) => {
    const body = JSON.stringify({ email, password });
    try {
        const res = await api.post(REACT_APP_WEB_API_PATH + '/connexion', body);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                ...res.data,
                email,
                rememberMe,
            },
        });

        dispatch(loadUser(email)).then(() => {
            history.push('/');
        });
    } catch (err) {
        const error = err.response ? err.response.data : err || null;
        if (error) dispatch(setAlert(error.message, 'error'));

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const logout = () => (dispatch) => {
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
