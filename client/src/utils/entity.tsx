import { flattenDeep, filter, isString, isEqual, get, uniqBy, forEach, map, isArray, size, compact } from 'lodash';

/**
 * Get only the @id of each attributes on the deepAttributes into the entity
 * Entity will be flatten by this function
 * You can change the attribute kept with a new var 'keepAttribute'
 *
 * @param entity
 * @param deepAttributes
 * @param keepAttribute
 * @returns entity
 */
export const entityDeepToFlat = (entity, deepAttributes, keepAttribute = '@id') => {
    forEach(deepAttributes, (deepAttribute) => {
        entity = {
            ...entity,
            // If the attribute is an array get all the @id of each items
            // If not, get the @id of the attribute object
            [deepAttribute]: isArray(entity[deepAttribute])
                ? map(entity[deepAttribute], (attribute) => get(attribute, keepAttribute))
                : get(entity[deepAttribute], keepAttribute),
        };
    });
    return entity;
};

/**
 * Merge a list of entities with another list by getting attributes on each item
 *
 * @param listToUpdate
 * @param listToMerge
 * @param attributes
 * @returns listToUpdate
 */
export const mergeEntities = (listToUpdate, listToMerge, attributes = null) => {
    // Get all the attributes on each object into the listToMerge var
    // Compact will remove the null item found, and flattenDeep will remove deeps arrays
    const objects = compact(
        flattenDeep(
            map(listToMerge, (object) => {
                if (attributes) {
                    if (isArray(attributes)) return map(attributes, (attribute) => get(object, attribute));

                    return get(object, attributes);
                }
                return object;
            })
        )
    );

    // merge with the new list
    return updateEntity(listToUpdate, objects);
};

/**
 * Update entity on the list only if it not already in
 *
 * @param listToUpdate
 * @param listToMerge
 * @param attribute
 * @returns
 */
export const updateEntity = (listToUpdate, listToMerge, attribute = null) => {
    // Filter the list to merge by keep unique @id
    // If attribute is defined the the @id of the attribute on the object, else get the @id of the object
    const listUniq = uniqBy(listToMerge, (objectUniq) => get(objectUniq, attribute ? [attribute, '@id'] : '@id'));

    forEach(listUniq, (objectToMerge) => {
        // Test if we found a @id into the listToUpdate
        if (
            size(
                filter(listToUpdate, (itemToUpdate) =>
                    // same ternary
                    isEqual(get(objectToMerge, attribute ? [attribute, '@id'] : '@id'), get(itemToUpdate, '@id'))
                )
            ) === 0
        ) {
            // If there is no object with the same @id put it into the list with a notFull attribute to true
            listToUpdate = [
                ...listToUpdate,
                {
                    ...get(objectToMerge, attribute, objectToMerge),
                    notFull: true,
                },
            ];
        }
    });

    return listToUpdate;
};

// Get all uris value from an array and filter null uri
export const notFullEntitiesFromArray = (value) =>
    filter(
        map(value, (val) => {
            if (isString(val)) return val;
            if (get(val, 'notFull')) return get(val, '@id');
            return null;
        }),
        (value) => value !== null
    );

// Get all uris value from an array
export const getUrisFromArray = (value) => map(value, (val) => (isString(val) ? val : get(val, '@id')));
