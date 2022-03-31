import moment from 'moment';
import { isEqual, get, find } from 'lodash';

const { REACT_APP_DATE_FORMAT_SHOW, REACT_APP_DATE_TIME_FORMAT_SHOW } = process.env;

/*
 * Function to sort text on table
 */
export const sortText = (v1, v2) => {
    if (v1 === v2) return 0;
    return v1 > v2 ? 1 : -1;
};

/*
 * Function to sort date on table
 */
export const sortDate = (v1, v2) => {
    const v1Date = moment(v1, REACT_APP_DATE_FORMAT_SHOW);
    const v2Date = moment(v2, REACT_APP_DATE_FORMAT_SHOW);
    if (v1Date.isSame(v2Date)) return 0;
    return v1Date.isAfter(v2Date) ? 1 : -1;
};

/*
 * Function to sort date time on table
 */
export const sortDatetime = (v1, v2) => {
    const v1Date = moment(v1, REACT_APP_DATE_TIME_FORMAT_SHOW);
    const v2Date = moment(v2, REACT_APP_DATE_TIME_FORMAT_SHOW);
    if (v1Date.isSame(v2Date)) return 0;
    return v1Date.isAfter(v2Date) ? 1 : -1;
};

/*
 * Function to sort date on table
 */
export const sortEntity = (entities) => (v1, v2) => {
    const v1Name = get(
        find(entities, (entity) => isEqual(v1, get(entity, '@id'))),
        'name'
    );
    const v2Name = get(
        find(entities, (entity) => isEqual(v2, get(entity, '@id'))),
        'name'
    );

    if (!v2Name) return 1;

    if (!v1Name) return -1;

    if (v1Name === v2Name) return 0;
    return v1Name > v2Name ? 1 : -1;
};
