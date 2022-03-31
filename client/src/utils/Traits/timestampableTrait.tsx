import { formatDate, formatDateNow } from '../date';
import { onChangeDate } from '../onChangeInput';
/*
 * Trait used for the timestamp information
 */

// All the rows of a form view
export const getFormRows = (formData, setFormData, t, group = null) => [
    {
        title: t('trait.timestampable.attributes.createdAt'),
        group: group ?? 'trait.timestampable.group',
        id: 'createdAt',
        type: 'datetime-local',
        value: formData.createdAt,
        required: true,
        onChange: onChangeDate(formData, setFormData),
    },
    {
        title: t('trait.timestampable.attributes.updatedAt'),
        group: group ?? 'trait.timestampable.group',
        id: 'updatedAt',
        type: 'datetime-local',
        value: formData.updatedAt,
        onChange: onChangeDate(formData, setFormData),
    },
];

// Get the object formated
export const getFormData = (entity) => ({
    createdAt: entity?.createdAt ? formatDate(entity.createdAt, { getTimeZoneUTC0: true }) : formatDateNow({}),
    updatedAt: entity?.updatedAt ? formatDate(entity.updatedAt, { getTimeZoneUTC0: true }) : '',
});

// All the rows of a show view
export const getShowRows = (entity, group = null) => [
    {
        title: 'trait.timestampable.attributes.createdAt',
        group: group ?? 'trait.timestampable.group',
        variable: entity?.createdAt,
        type: 'datetime',
    },
    {
        title: 'trait.timestampable.attributes.updatedAt',
        group: group ?? 'trait.timestampable.group',
        variable: entity?.updatedAt,
        type: 'datetime',
    },
];

// All the rows of a list view
export const getListRows = (t) => [
    {
        field: 'createdAt',
        headerName: t('trait.timestampable.attributes.createdAt'),
        type: 'datetime',
    },
    {
        field: 'updatedAt',
        headerName: t('trait.timestampable.attributes.updatedAt'),
        type: 'datetime',
    },
];
