import {
    createEntity,
    editEntity,
    getAll,
    getById,
    getByUri,
    removeEntity,
    patchEntity,
    disableEntity,
    enableEntity,
} from '../../Core/actions/entities';
import { GET_SKELETON, SKELETON_ERROR, GET_SKELETONS, GET_ALL_SKELETONS, CREATE_SKELETON, UPDATE_SKELETON, REMOVE_SKELETON } from './types';

export const getSkeletonByUri = (skeletonUri) => async (dispatch) => {
    dispatch(getByUri('skeletons', skeletonUri, GET_SKELETONS, GET_SKELETON, SKELETON_ERROR));
};

export const getSkeletonById = (skeletonId) => async (dispatch) => {
    dispatch(getById('skeletons', skeletonId, GET_SKELETON, SKELETON_ERROR));
};

export const getAllSkeletons =
    (page = null, order = null, asc = null, filters = null) =>
    async (dispatch) => {
        dispatch(getAll('skeletons', GET_ALL_SKELETONS, GET_SKELETONS, SKELETON_ERROR, page, order, asc, filters));
    };

export const createSkeleton = (formData, history, t) => async (dispatch) => {
    return dispatch(createEntity('skeletons', formData, CREATE_SKELETON, SKELETON_ERROR, t('skeleton.success.add'), history, 'skeleton'));
};

export const editSkeleton = (skeletonId, formData, history, t) => async (dispatch) => {
    dispatch(editEntity(skeletonId, 'skeletons', formData, UPDATE_SKELETON, SKELETON_ERROR, t('skeleton.success.update'), history, 'skeleton'));
};

export const patchSkeleton = (skeletonId, formData, t) => async (dispatch) => {
    dispatch(patchEntity(skeletonId, 'skeletons', formData, UPDATE_SKELETON, SKELETON_ERROR, t('skeleton.success.update')));
};

export const removeSkeleton = (skeletonId, t) => async (dispatch) => {
    dispatch(removeEntity(skeletonId, 'skeletons', REMOVE_SKELETON, SKELETON_ERROR, t('skeleton.success.remove')));
};

export const disableSkeleton = (skeletonId, t) => async (dispatch) => {
    dispatch(disableEntity(skeletonId, 'skeletons', UPDATE_SKELETON, SKELETON_ERROR, t('skeleton.success.disable')));
};

export const enableSkeleton = (skeletonId, t) => async (dispatch) => {
    dispatch(enableEntity(skeletonId, 'skeletons', UPDATE_SKELETON, SKELETON_ERROR, t('skeleton.success.enable')));
};
