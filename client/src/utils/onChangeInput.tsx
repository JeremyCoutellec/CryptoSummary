import { get, map, filter, concat, isArray, find } from 'lodash';
import { formatDate } from './date';

/*
 * Functions use on form
 */

// Default function : get value on the event (e) param
export const onChangeDefault = (formData, setFormData) => (e) => setFormData({ ...formData, [e?.target?.name]: e?.target?.value });

// Number function : get value on the event (e) param and parse Float
export const onChangeNumber = (formData, setFormData) => (e) =>
    setFormData({
        ...formData,
        [e?.target?.name]: parseFloat(e?.target?.value) ? parseFloat(e?.target?.value) : 0,
    });

// Boolean function : get checked value on the event (e) param
export const onChangeBoolean = (formData, setFormData) => (e) => setFormData({ ...formData, [e?.target?.name]: e?.target?.checked });

// Default function : get value on the event (e) param
export const onChangeDate = (formData, setFormData) => (e) =>
    setFormData({
        ...formData,
        [e?.target?.name]: e?.target?.value
            ? formatDate(e?.target?.value, {
                  removeTimeZoneStaff: true,
                  isTimeStamp: false,
              })
            : null,
    });
/*
 * Array function : get value and modify the ``id`` variable on formadata
 * Adding a new value => dataModify = object, index = null, push = true
 * Modify value => dataModify = object, index = index of the value, push = false
 * Remove value => dataModify = null, index = index of the value, push = false
 */
export const onChangeArray =
    (formData, setFormData) =>
    (dataModify, id, index = null, push = false, multiple = false) => {
        if (get(formData, id)) {
            let objectToModify = null;
            if (dataModify && push) {
                // If push, add a new value a the end of the array
                objectToModify = concat(formData[id], isArray(dataModify) ? dataModify : Array(dataModify));
            } else if (dataModify && multiple) {
                // modify each value on dataModify
                objectToModify = map(formData[id], (data, dataIndex) => {
                    const valueFind = find(dataModify, (_, dataModifyKey) => dataIndex === dataModifyKey);
                    return valueFind ?? data;
                });
            } else if (dataModify && index >= 0) objectToModify = map(formData[id], (data, dataIndex) => (index !== dataIndex ? data : dataModify));
            else if (dataModify && index < 0) {
                // If there is no index, push all dataModify
                objectToModify = dataModify;
            } else {
                //  if dataModify is not defined, remove the value at the index of the table
                objectToModify = filter(formData[id], (_, rowIndex) => rowIndex !== index);
            }
            setFormData({
                ...formData,
                // if dataModify is defined find the index to modify the variable at the index of the table
                [id]: objectToModify,
            });
        }
    };

// File function : get value and modify the ``name`` variable on formData
export const onChangeValue = (formData, setFormData, name) => (value) => setFormData({ ...formData, [name]: value });

export const onChangeAutoComplete =
    (formData, setFormData, name, multiple = false, propertyName = null) =>
    (_, newValue) => {
        if (propertyName) {
            setFormData({
                ...formData,
                [propertyName]: {
                    ...formData[propertyName],
                    [name]: multiple ? map(newValue, (newVal) => newVal?.value ?? newVal) : newValue?.value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: multiple ? map(newValue, (newVal) => newVal?.value ?? newVal) : newValue?.value,
            });
        }
    };
