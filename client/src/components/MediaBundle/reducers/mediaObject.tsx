import { LOGOUT, REFRESH } from '../../Core/actions/types';
import {
    GET_MEDIA_OBJECT,
    GET_MEDIA_OBJECTS,
    GET_ALL_MEDIA_OBJECTS,
    CREATE_MEDIA_OBJECT,
    UPDATE_MEDIA_OBJECT,
    REMOVE_MEDIA_OBJECT,
} from '../actions/types';
import { findIndex, find, filter, isEqual, size } from 'lodash';

const initialState = {
    list: [],
    loading: true,
    totalMediaObjects: 0,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_MEDIA_OBJECT:
            const mediaObjectIndex = findIndex(state.list, {
                id: payload?.mediaObject?.id,
            });
            if (mediaObjectIndex !== -1) {
                state.list[mediaObjectIndex] = payload?.data;
                return {
                    ...state,
                    list: [...state.list],
                };
            } else {
                return {
                    ...state,
                    list: [...state.list, payload?.data],
                };
            }
        case GET_MEDIA_OBJECTS:
        case GET_ALL_MEDIA_OBJECTS:
            const newList = [...filter(state.list, (mediaObject) => !find(payload?.list, { id: mediaObject.id })), ...payload.list];
            return {
                list: newList,
                totalMediaObjects: size(newList) > payload?.totalItems ? size(newList) : payload?.totalItems,
                loading: false,
            };
        case CREATE_MEDIA_OBJECT:
            return {
                list: [...state.list, payload?.data],
                totalMediaObjects: state.totalMediaObjects + 1,
                loading: true,
            };
        case UPDATE_MEDIA_OBJECT:
            return {
                ...state,
                list: [...filter(state.list, (mediaObject) => !isEqual(payload?.data?.id, mediaObject.id)), payload?.data],
                loading: true,
            };
        case REMOVE_MEDIA_OBJECT:
            return {
                ...state,
                list: [...filter(state.list, (mediaObject) => !isEqual(payload?.id, mediaObject.id))],
                loading: true,
            };
        case REFRESH:
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
