import moment from 'moment';
import { forEach, replace, startsWith } from 'lodash';
const { REACT_APP_DATE_FORMAT_INPUT } = process.env;

/**
 * Format date by the react env Date form
 */
export const formatDate = (
    dateString,
    { getTimeZoneUTC0 = false, removeTimeZoneStaff = false, isTimeStamp = true, format = REACT_APP_DATE_FORMAT_INPUT, formatDateString = null } = null
) => {
    const newTime = isTimeStamp ? formatTimeStamp(dateString) : dateString;

    let dateMoment = dateString && moment(newTime, formatDateString).utc(true).isValid() ? moment(newTime, formatDateString).utc(true) : null;

    if (dateMoment) {
        const timeZoneStaff = localStorage.getItem('timezone');
        if (getTimeZoneUTC0) dateMoment = dateMoment.utcOffset('+00:00');
        else if (removeTimeZoneStaff) {
            dateMoment = dateMoment.utcOffset(
                startsWith(timeZoneStaff, '-') ? replace(localStorage.getItem('timezone'), '-', '+') : replace(timeZoneStaff, '+', '-')
            );
        } else dateMoment = dateMoment.utcOffset(timeZoneStaff);
    }

    return dateMoment ? dateMoment.format(format ?? REACT_APP_DATE_FORMAT_INPUT) : '';
};

/**
 * Format date of now by the react env Date form
 */
export const formatDateNow = ({ timezone = null, format = REACT_APP_DATE_FORMAT_INPUT }) => {
    const dateMoment = moment()
        .utc()
        .utcOffset(timezone ?? '00:00');
    return dateMoment.format(format);
};

/**
 * Format date by timestamp format
 */
export const formatTimeStamp = (dateString) => (dateString ? moment.unix(dateString).utc() : '');

/**
 * Get day of a date
 * isTimeStamp true if the dateString is a timestamp
 */
export const getDayOfDate = ({ dateString, isTimeStamp = false }) => {
    const newTime = isTimeStamp ? formatDate(dateString, {}) : dateString;
    return dateString ? moment(newTime).isoWeekday() : '';
};

/**
 * Get a date at Midnight or evening depends on evening props
 * isoWeekday get the first day of this week.
 * Monday is 1, Sunday is 7.
 */
export const getDateByDayOfWeek = (isoWeekday = 1, evening = false, dateWeek = null) => {
    const date = dateWeek ? moment(dateWeek).isoWeekday(isoWeekday) : moment().isoWeekday(isoWeekday);

    date.set({
        hour: evening ? 23 : 0,
        minute: evening ? 59 : 0,
        second: evening ? 59 : 0,
        millisecond: evening ? 999 : 0,
    });
    return date;
};

export const formatDateForm = ({ formData, attributes = [] }) => {
    forEach(attributes, (attribute) => {
        formData = {
            ...formData,
            [attribute]: formatDate(formData?.attribute, {
                timezone: '00:00',
                isTimeStamp: false,
            }),
        };
    });
    return formData;
};
