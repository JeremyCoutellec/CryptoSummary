import { createSelector } from '@reduxjs/toolkit';
import { find, isArray, filter, includes } from 'lodash';
import { canReadEntity, canWriteEntity, canAllEntity } from '../../../utils/roles';
import { getMediaObjectsSelector } from '../../MediaBundle/selectors/mediaObject';

import { getUserAuthSelector } from './auth';

const selectSelf = (state) => state;

export const getEntitySelector = (entity) =>
    createSelector(
        selectSelf,
        // eslint-disable-next-line no-undef
        (state: never) => {
            switch (entity) {
                // Media Bundle
                case 'mediaObject':
                    return getMediaObjectsSelector(state);
            }
        }
    );

export const getEntitySelectorByUri = (entity, uri) =>
    createSelector(getEntitySelector(entity), (entities) => {
        if (!uri) return null;
        if (isArray(uri)) return filter(entities, (entity) => includes(uri, entity['@id']));
        // eslint-disable-next-line eqeqeq
        else return find(entities, (entity) => entity['@id'] == uri);
    });

export const getEntityBy = (entity, callback) => createSelector(getEntitySelector(entity), (entities) => find(entities, callback));

export const getEntitiesBy = (entity, callback) => createSelector(getEntitySelector(entity), (entities) => filter(entities, callback));

export const canReadEntitySelector = (entityName, entity = null) =>
    createSelector(getUserAuthSelector, (user) => canReadEntity(user, entityName, entity));

export const canWriteEntitySelector = (entityName, entity = null) =>
    createSelector(getUserAuthSelector, (user) => canWriteEntity(user, entityName, entity));

export const canAllEntitySelector = (entityName, entity = null) =>
    createSelector(getUserAuthSelector, (user) => canAllEntity(user, entityName, entity));
