/*
 * Trait used for the toggle information
 */

import { onChangeBoolean } from '../onChangeInput';

// All the rows of a form view
export const getFormRows = (formData, setFormData, t, group = null, masculin = true) => [
    {
        title: t(`trait.toggleable.attributes.isEnable.${masculin ? 1 : 0}`),
        group: group ?? `trait.toggleable.group.${masculin ? 1 : 0}`,
        id: 'isEnable',
        type: 'boolean',
        value: formData.isEnable,
        onChange: onChangeBoolean(formData, setFormData),
    },
];

// Get the object formated
export const getFormData = (entity, isEnable = false) => ({
    isEnable: entity?.isEnable ?? isEnable,
});

// All the rows of a show view
export const getShowRows = (entity, group = null, masculin = true) => [
    {
        title: `trait.toggleable.attributes.isEnable.${masculin ? 1 : 0}`,
        group: group ?? `trait.toggleable.group.${masculin ? 1 : 0}`,
        variable: entity?.isEnable,
        type: 'boolean',
    },
];

// All the rows of a list view
export const getListRows = (t, masculin = true) => [
    {
        field: 'isEnable',
        headerName: t(`trait.toggleable.attributes.isEnable.${masculin ? 0 : 1}`),
        fieldType: 'bool',
    },
];
