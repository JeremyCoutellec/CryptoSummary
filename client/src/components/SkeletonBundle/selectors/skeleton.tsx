import { createSelector } from '@reduxjs/toolkit';
import { find, filter } from 'lodash';

const selectSelf = (state) => state;

export const getSkeletonSelector = createSelector(selectSelf, (state) => state.skeleton);

export const getSkeletonsSelector = createSelector(getSkeletonSelector, (skeleton) => skeleton?.list);

export const getSkeletonInfoById = (id) =>
    createSelector(
        getSkeletonsSelector,
        // eslint-disable-next-line eqeqeq
        (skeletons) => find(skeletons, (skeleton) => skeleton.id == id)
    );

export const getSkeletonInfoBy = (object) => createSelector(getSkeletonsSelector, (skeletons) => find(skeletons, object));

export const getSkeletonsBy = (object) => createSelector(getSkeletonsSelector, (skeletons) => filter(skeletons, object));
