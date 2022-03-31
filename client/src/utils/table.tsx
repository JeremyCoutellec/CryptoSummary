import { compact, mean, size, get, map, isObject, isArray, forEach, round } from 'lodash';

// if items of the table are objects => get the attribute of an object
export const meanValuesByAttribute = (values, attribute = null, roundValue = 2) => {
    const valuesCompact = compact(map(values, (value) => (isObject(value) && attribute ? get(value, attribute) : value)));
    return size(valuesCompact) > 0 ? round(mean(valuesCompact), roundValue) : null;
};

// Return mean value of a table
// if items of the table are objects => mean all attributes of an object
export const meanValuesByAttributes = (values, attributes = null, roundValue = 2) => {
    if (isArray(attributes)) {
        let meanValues = {};
        forEach(attributes, (attribute) => {
            meanValues = {
                ...meanValues,
                [attribute]: meanValuesByAttribute(values, attribute, roundValue),
            };
        });
        return meanValues;
    } else return meanValuesByAttribute(values, attributes, roundValue);
};
