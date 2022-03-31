/*
 * Trait used for the bank information
 */

// All the rows of a form view
export const getFormRows = (formData, setFormData, t, group = null) => [
    {
        title: t('trait.bankable.attributes.rib'),
        group: group ?? 'trait.bankable.group',
        id: 'rib',
        type: 'text',
        min: 24,
        max: 24,
        value: formData.rib,
        onChange: (e) =>
            setFormData({
                ...formData,
                rib: e.target.value,
            }),
    },
    {
        title: t('trait.bankable.attributes.iban'),
        group: group ?? 'trait.bankable.group',
        id: 'iban',
        type: 'text',
        min: 15,
        max: 34,
        value: formData.iban,
        onChange: (e) =>
            setFormData({
                ...formData,
                iban: e.target.value,
            }),
    },
    {
        title: t('trait.bankable.attributes.bic'),
        group: group ?? 'trait.bankable.group',
        id: 'bic',
        type: 'text',
        min: 8,
        max: 11,
        value: formData.bic,
        onChange: (e) =>
            setFormData({
                ...formData,
                bic: e.target.value,
            }),
    },
    {
        title: t('trait.bankable.attributes.swift'),
        group: group ?? 'trait.bankable.group',
        id: 'swift',
        type: 'text',
        min: 11,
        max: 11,
        value: formData.swift,
        onChange: (e) =>
            setFormData({
                ...formData,
                swift: e.target.value,
            }),
    },
];

// Get the object formated
export const getFormData = (entity) => ({
    rib: entity?.rib ?? '',
    iban: entity?.iban ?? '',
    bic: entity?.bic ?? '',
    swift: entity?.swift ?? '',
});

// All the rows of a show view
export const getShowRows = (entity, group) => [
    {
        title: 'trait.bankable.attributes.rib',
        group: group ?? 'trait.bankable.group',
        variable: entity?.rib,
    },
    {
        title: 'trait.bankable.attributes.iban',
        group: group ?? 'trait.bankable.group',
        variable: entity?.iban,
    },
    {
        title: 'trait.bankable.attributes.bic',
        group: group ?? 'trait.bankable.group',
        variable: entity?.bic,
    },
    {
        title: 'trait.bankable.attributes.swift',
        group: group ?? 'trait.bankable.group',
        variable: entity?.swift,
    },
];

// All the rows of a list view
export const getListRows = (t) => [
    { field: 'rib', headerName: t('trait.bankable.attributes.rib') },
    { field: 'iban', headerName: t('trait.bankable.attributes.iban') },
    { field: 'bic', headerName: t('trait.bankable.attributes.bic') },
    { field: 'swift', headerName: t('trait.bankable.attributes.swift') },
];
