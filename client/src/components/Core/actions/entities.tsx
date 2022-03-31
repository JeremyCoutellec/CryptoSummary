import api, { uriToId } from '../../../utils/api';
import { join, map, isArray, isString, get, size, head } from 'lodash';

import { setAlert, setError } from '../../Core/actions/alert';
import { REFRESH } from './types';
import { getMediaObjectByUri } from '../../MediaBundle/actions/mediaObject';

const { REACT_APP_WEB_API_PATH } = process.env;

export const getEntityByURi = (entity, uri) => async (dispatch) => {
    switch (entity) {
        // Media Bundle
        case 'mediaObject':
            dispatch(getMediaObjectByUri(uri));
            break;
        default:
            return false;
    }
};

export const getByUri = (path, uri, typeGetEntities, typeGetEntity, typeError) => async (dispatch) => {
    if (!path || !uri) return;

    if (isArray(uri) && size(uri) === 1) uri = head(uri);

    try {
        if (isArray(uri) && size(uri) > 1) {
            const res = await api.get(
                REACT_APP_WEB_API_PATH +
                    '/' +
                    path +
                    '?pagination=false&' +
                    join(
                        map(uri, (uri) => 'id[]=' + uriToId(uri)),
                        '&'
                    )
            );
            dispatch({
                type: typeGetEntities,
                payload: {
                    list: res.data['hydra:member'],
                    totalItems: res.data['hydra:totalItems'],
                },
            });
        } else if (isString(uri)) {
            const res = await api.get(uri);
            dispatch({
                type: typeGetEntity,
                payload: {
                    data: res.data,
                    uri: uri,
                },
            });
        }
    } catch (err) {
        dispatch(setError(err));
        dispatch({
            type: typeError,
        });
    }
};

export const getById = (path, id, typeGetEntity, typeError) => async (dispatch) => {
    if (!path || !id) return;

    try {
        const res = await api.get(REACT_APP_WEB_API_PATH + '/' + path + '/' + id);
        dispatch({
            type: typeGetEntity,
            payload: {
                data: res.data,
                id,
            },
        });
    } catch (err) {
        dispatch(setError(err));
        dispatch({
            type: typeError,
        });
    }
};

export const getAll =
    (
        path,
        typeGetAllEntity,
        typeGetEntities,
        typeError,
        page = null,
        order = null,
        asc = null,
        filters = null,
        exist = null,
        alreadyHasGetter = false
    ) =>
    async (dispatch) => {
        if (!path) return;

        try {
            const res = await api.get(
                REACT_APP_WEB_API_PATH +
                    '/' +
                    path +
                    (alreadyHasGetter ? '' : '?') +
                    (page ? 'page=' + page : 'pagination=false') +
                    (order ? '&order[' + order + ']=' + (asc ? asc : 'asc') : '') +
                    (filters
                        ? '&' +
                          join(
                              map(filters, (filterItem) => filterItem?.columnField + '=' + filterItem?.value),
                              '&'
                          )
                        : '') +
                    (exist ? '&exists[' + exist?.columnField + ']=' + exist?.value : '')
            );

            dispatch({
                type: page || filters ? typeGetEntities : typeGetAllEntity,
                payload: {
                    list: res.data['hydra:member'],
                    totalItems: res.data['hydra:totalItems'],
                },
            });
        } catch (err) {
            dispatch(setError(err));
            dispatch({
                type: typeError,
            });
        }
    };

export const createEntity =
    (
        path,
        formData,
        typeCreateEntity,
        typeError,
        titleSuccess,
        history = null,
        pathShow = null,
        isShowModalActionCampaign = false,
        filtersActionModal = {
            filterCompanies: null,
            filterDeviceModels: null,
        }
    ) =>
    async (dispatch) => {
        if (!path) return;

        const body = JSON.stringify(formData);
        try {
            const res = await api.post(REACT_APP_WEB_API_PATH + '/' + path, body);
            dispatch({
                type: typeCreateEntity,
                payload: {
                    data: res.data,
                },
            });
            dispatch(setAlert(titleSuccess, 'success'));
            if (history && pathShow && res?.data?.id) history.push(`/${pathShow}-${res?.data?.id}`);

            return res?.data;
        } catch (err) {
            dispatch(setError(err));
            dispatch({
                type: typeError,
            });
        }
    };

export const editEntity =
    (
        id,
        path,
        formData,
        typeEditEntity,
        typeError,
        titleSuccess,
        history = null,
        pathShow = null,
        isShowModalActionCampaign = false,
        filtersActionModal = {
            filterCompanies: null,
            filterDeviceModels: null,
        }
    ) =>
    async (dispatch) => {
        if (!path || !id) return;

        const body = JSON.stringify(formData);
        try {
            const res = await api.patch(REACT_APP_WEB_API_PATH + '/' + path + '/' + id, body);
            dispatch({
                type: typeEditEntity,
                payload: {
                    data: res.data,
                },
            });
            dispatch(setAlert(titleSuccess, 'success'));
            if (history && pathShow && res?.data?.id) history.push(`/${pathShow}-${res?.data?.id}`);

            return res?.data;
        } catch (err) {
            dispatch(setError(err));
            dispatch({
                type: typeError,
            });
        }
    };

export const patchEntity = (id, path, formData, typeEditEntity, typeError, titleSuccess) => async (dispatch) => {
    if (!path || !id) return;

    const body = JSON.stringify(formData);
    try {
        const res = await api.patch(REACT_APP_WEB_API_PATH + '/' + path + '/' + id, body);
        dispatch({
            type: typeEditEntity,
            payload: {
                data: res.data,
            },
        });
        dispatch(setAlert(titleSuccess, 'success'));
    } catch (err) {
        dispatch(setError(err));
        dispatch({
            type: typeError,
        });
    }
};

export const removeEntity = (id, path, typeRemoveEntity, typeError, titleSuccess) => async (dispatch) => {
    if (!path || !id) return;

    try {
        await api.delete(REACT_APP_WEB_API_PATH + '/' + path + '/' + id);
        dispatch({
            type: typeRemoveEntity,
            payload: {
                id,
            },
        });
        dispatch(setAlert(titleSuccess, 'success'));
    } catch (err) {
        dispatch(setError(err));
        dispatch({
            type: typeError,
        });
    }
};

export const disableEntity = (id, path, typeEditEntity, typeError, titleSuccess) => async (dispatch) => {
    if (!path || !id) return;

    const body = JSON.stringify({});
    try {
        const res = await api.patch(REACT_APP_WEB_API_PATH + '/' + path + '/' + id + '/disable', body);
        dispatch({
            type: typeEditEntity,
            payload: {
                data: res.data,
            },
        });
        dispatch(setAlert(titleSuccess, 'success'));
    } catch (err) {
        dispatch(setError(err));
        dispatch({
            type: typeError,
        });
    }
};

export const enableEntity = (id, path, typeEditEntity, typeError, titleSuccess) => async (dispatch) => {
    if (!path || !id) return;

    const body = JSON.stringify({});
    try {
        const res = await api.patch(REACT_APP_WEB_API_PATH + '/' + path + '/' + id + '/enable', body);
        dispatch({
            type: typeEditEntity,
            payload: {
                data: res.data,
            },
        });
        dispatch(setAlert(titleSuccess, 'success'));
    } catch (err) {
        dispatch(setError(err));
        dispatch({
            type: typeError,
        });
    }
};

export const closeEntity = (id, path, formData, typeEditEntity, typeError, titleSuccess) => async (dispatch) => {
    if (!path || !id) return;

    const body = JSON.stringify(formData);
    try {
        const res = await api.patch(REACT_APP_WEB_API_PATH + '/' + path + '/' + id + '/close', body);
        dispatch({
            type: typeEditEntity,
            payload: {
                data: res.data,
            },
        });
        dispatch(setAlert(titleSuccess, 'success'));
    } catch (err) {
        dispatch(setError(err));
        dispatch({
            type: typeError,
        });
    }
};

export const refreshEntities = () => async (dispatch) => {
    dispatch({
        type: REFRESH,
    });
};
