import { createSelector } from '@reduxjs/toolkit';
import { find, filter } from 'lodash';

const selectSelf = (state) => state;

export const getMediaObjectSelector = createSelector(selectSelf, (state) => state.mediaObject);

export const getMediaObjectsSelector = createSelector(getMediaObjectSelector, (mediaObject) => mediaObject?.list);

export const getMediaObjectInfoById = (id) =>
    createSelector(
        getMediaObjectsSelector,
        // eslint-disable-next-line eqeqeq
        (mediaObjects) => find(mediaObjects, (mediaObject) => mediaObject.id == id)
    );

export const getMediaObjectInfoBy = (object) => createSelector(getMediaObjectsSelector, (mediaObjects) => find(mediaObjects, object));
