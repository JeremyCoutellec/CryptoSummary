import api from '../../../utils/api';
import { setAlert, setError } from '../../Core/actions/alert';
import {
    createEntity,
    disableEntity,
    editEntity,
    enableEntity,
    getAll,
    getById,
    getByUri,
    patchEntity,
    removeEntity,
} from '../../Core/actions/entities';
import {
    GET_MEDIA_OBJECT,
    MEDIA_OBJECT_ERROR,
    GET_MEDIA_OBJECTS,
    GET_ALL_MEDIA_OBJECTS,
    CREATE_MEDIA_OBJECT,
    UPDATE_MEDIA_OBJECT,
    REMOVE_MEDIA_OBJECT,
} from './types';

const { REACT_APP_WEB_API_PATH } = process.env;

export const uploadMediaObject = (formData, t) => async (dispatch) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    try {
        const res = await api.post(REACT_APP_WEB_API_PATH + '/media_objects', formData, config);
        dispatch({
            type: CREATE_MEDIA_OBJECT,
            payload: {
                data: res.data,
            },
        });
        dispatch(setAlert(t('mediaObject.success.add'), 'success'));
        return res?.data;
    } catch (err) {
        dispatch(setError(err));
        dispatch({
            type: MEDIA_OBJECT_ERROR,
        });
    }
};

export const getMediaObjectByUri = (mediaObjectUri) => async (dispatch) => {
    dispatch(getByUri('media_objects', mediaObjectUri, GET_MEDIA_OBJECTS, GET_MEDIA_OBJECT, MEDIA_OBJECT_ERROR));
};

export const getMediaObjectById = (mediaObjectId) => async (dispatch) => {
    dispatch(getById('media_objects', mediaObjectId, GET_MEDIA_OBJECT, MEDIA_OBJECT_ERROR));
};

export const getAllMediaObjects =
    (page = null, order = null, asc = null, filters = null) =>
    async (dispatch) => {
        dispatch(getAll('media_objects', GET_ALL_MEDIA_OBJECTS, GET_MEDIA_OBJECTS, MEDIA_OBJECT_ERROR, page, order, asc, filters));
    };

export const createMediaObject = (formData, history, t) => async (dispatch) => {
    return dispatch(
        createEntity('media_objects', formData, CREATE_MEDIA_OBJECT, MEDIA_OBJECT_ERROR, t('mediaObject.success.add'), history, 'media_object')
    );
};

export const editMediaObject = (mediaObjectId, formData, history, t) => async (dispatch) => {
    dispatch(
        editEntity(
            mediaObjectId,
            'media_objects',
            formData,
            UPDATE_MEDIA_OBJECT,
            MEDIA_OBJECT_ERROR,
            t('mediaObject.success.update'),
            history,
            'media_object'
        )
    );
};

export const patchMediaObject = (mediaObjectId, formData, t) => async (dispatch) => {
    dispatch(patchEntity(mediaObjectId, 'media_objects', formData, UPDATE_MEDIA_OBJECT, MEDIA_OBJECT_ERROR, t('mediaObject.success.update')));
};

export const removeMediaObject = (mediaObjectId, t) => async (dispatch) => {
    dispatch(removeEntity(mediaObjectId, 'media_objects', REMOVE_MEDIA_OBJECT, MEDIA_OBJECT_ERROR, t('mediaObject.success.remove')));
};

export const disableMediaObject = (mediaObjectId, t) => async (dispatch) => {
    dispatch(disableEntity(mediaObjectId, 'media_objects', UPDATE_MEDIA_OBJECT, MEDIA_OBJECT_ERROR, t('mediaObject.success.disable')));
};

export const enableMediaObject = (mediaObjectId, t) => async (dispatch) => {
    dispatch(enableEntity(mediaObjectId, 'media_objects', UPDATE_MEDIA_OBJECT, MEDIA_OBJECT_ERROR, t('mediaObject.success.enable')));
};
