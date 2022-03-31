import { LOGOUT, REFRESH } from '../../Core/actions/types';
import { GET_SKELETON, GET_SKELETONS, GET_ALL_SKELETONS, CREATE_SKELETON, UPDATE_SKELETON, REMOVE_SKELETON } from '../actions/types';
import { findIndex, find, filter, isEqual, includes, map, size } from 'lodash';
import { entityDeepToFlat, mergeEntities } from '../../../utils/entity';

const initialState = {
    list: [],
    loading: true,
    totalSkeletons: 0,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    let skeletonList = [];
    let skeleton = null;
    if (includes([GET_SKELETON, CREATE_SKELETON, UPDATE_SKELETON], type) && payload?.data) skeleton = entityDeepToFlat(payload?.data, ['child']);

    if (includes([GET_SKELETONS, GET_ALL_SKELETONS], type) && payload?.list)
        skeletonList = map(payload.list, (skeleton) => entityDeepToFlat(skeleton, ['childSkeleton']));

    switch (type) {
        case 'OTHER':
            return {
                ...state,
                list: mergeEntities(state?.list, [payload?.data], 'skeleton'),
            };
        case 'OTHERS':
            return {
                ...state,
                list: mergeEntities(state?.list, payload?.list, 'skeleton'),
            };
        case GET_SKELETON:
            const skeletonIndex = findIndex(state?.list, { id: skeleton?.id });
            if (skeletonIndex !== -1) {
                state.list[skeletonIndex] = skeleton;
                return {
                    ...state,
                    list: state?.list,
                    loading: true,
                };
            } else {
                return {
                    ...state,
                    list: [...state.list, skeleton],
                    loading: true,
                };
            }
        case GET_SKELETONS:
        case GET_ALL_SKELETONS:
            const newList = [...filter(state?.list, (skeletonItem) => !find(skeletonList, { id: skeletonItem.id })), ...skeletonList];
            return {
                list: newList,
                totalSkeletons: size(newList) > payload?.totalItems ? size(newList) : payload?.totalItems,
                loading: false,
            };
        case CREATE_SKELETON:
            return {
                list: [...state.list, skeleton],
                totalSkeletons: state.totalSkeletons + 1,
                loading: true,
            };
        case UPDATE_SKELETON:
            return {
                ...state,
                list: [...filter(state?.list, (skeletonItem) => !isEqual(skeleton?.id, skeletonItem.id)), skeleton],
                loading: true,
            };
        case REMOVE_SKELETON:
            return {
                ...state,
                list: [...filter(state?.list, (skeletonItem) => !isEqual(payload?.id, skeletonItem.id))],
                loading: true,
            };
        case REFRESH:
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
