import i18n from '../../../i18n/i18next';
import { v4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert =
    (msg, alertType, title = '', timeout = 5000) =>
    (dispatch) => {
        const id = v4();
        dispatch({
            type: SET_ALERT,
            payload: {
                title,
                msg,
                alertType,
                id,
            },
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    };

export const setError =
    (error, title = null) =>
    (dispatch) => {
        dispatch(setAlert(error?.response?.data?.message, 'error', title ?? i18n.t('common.error')));
    };
