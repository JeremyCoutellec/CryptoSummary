/*
 * Trait used for the professional information
 */

// All the rows of a form view
export const getFormRows = (formData, setFormData, t, group = null) => [
    {
        title: t('trait.professionalable.attributes.socialReason'),
        group: group ?? 'trait.professionalable.group',
        md: 6,
        id: 'socialReason',
        min: 2,
        max: 45,
        value: formData.socialReason,
        onChange: (e) =>
            setFormData({
                ...formData,
                socialReason: e.target.value,
            }),
    },
    {
        title: t('trait.professionalable.attributes.legalForm'),
        group: group ?? 'trait.professionalable.group',
        md: 6,
        id: 'legalForm',
        min: 2,
        max: 30,
        value: formData.legalForm,
        onChange: (e) =>
            setFormData({
                ...formData,
                legalForm: e.target.value,
            }),
    },
    {
        title: t('trait.professionalable.attributes.siren'),
        group: group ?? 'trait.professionalable.group',
        id: 'siren',
        min: 2,
        max: 30,
        value: formData.siren,
        onChange: (e) =>
            setFormData({
                ...formData,
                siren: e.target.value,
            }),
    },
    {
        title: t('trait.professionalable.attributes.siret'),
        group: group ?? 'trait.professionalable.group',
        id: 'siret',
        min: 2,
        max: 30,
        value: formData.siret,
        onChange: (e) =>
            setFormData({
                ...formData,
                siret: e.target.value,
            }),
    },
    {
        title: t('trait.professionalable.attributes.vat'),
        group: group ?? 'trait.professionalable.group',
        md: 6,
        id: 'vat',
        min: 2,
        max: 30,
        value: formData.vat,
        onChange: (e) =>
            setFormData({
                ...formData,
                vat: e.target.value,
            }),
    },
    {
        title: t('trait.professionalable.attributes.rcs'),
        group: group ?? 'trait.professionalable.group',
        md: 6,
        id: 'rcs',
        min: 2,
        max: 30,
        value: formData.rcs,
        onChange: (e) =>
            setFormData({
                ...formData,
                rcs: e.target.value,
            }),
    },
    {
        title: t('trait.professionalable.attributes.ape'),
        group: group ?? 'trait.professionalable.group',
        md: 6,
        id: 'ape',
        min: 2,
        max: 30,
        value: formData.ape,
        onChange: (e) =>
            setFormData({
                ...formData,
                ape: e.target.value,
            }),
    },
    {
        title: t('trait.professionalable.attributes.capital'),
        group: group ?? 'trait.professionalable.group',
        md: 6,
        id: 'capital',
        type: 'number',
        value: formData.capital,
        onChange: (e) =>
            setFormData({
                ...formData,
                capital: parseFloat(e.target.value),
            }),
    },
    {
        title: t('trait.professionalable.attributes.shortDescription'),
        group: group ?? 'trait.professionalable.group',
        id: 'shortDescription',
        min: 2,
        max: 60,
        value: formData.shortDescription,
        onChange: (e) =>
            setFormData({
                ...formData,
                shortDescription: e.target.value,
            }),
    },
    {
        title: t('trait.professionalable.attributes.reference'),
        group: group ?? 'trait.professionalable.group',
        id: 'reference',
        min: 2,
        max: 40,
        value: formData.reference,
        onChange: (e) =>
            setFormData({
                ...formData,
                reference: e.target.value,
            }),
    },
];

// Get the object formated
export const getFormData = (entity) => ({
    socialReason: entity?.socialReason ?? '',
    legalForm: entity?.legalForm ?? '',
    siren: entity?.siren ?? '',
    siret: entity?.siret ?? '',
    vat: entity?.vat ?? '',
    rcs: entity?.rcs ?? '',
    ape: entity?.ape ?? '',
    capital: entity?.capital ?? null,
    shortDescription: entity?.shortDescription ?? '',
    reference: entity?.reference ?? '',
});

// All the rows of a show view
export const getShowRows = (entity, group = null) => [
    {
        title: 'trait.professionalable.attributes.socialReason',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.socialReason,
    },
    {
        title: 'trait.professionalable.attributes.legalForm',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.legalForm,
    },
    {
        title: 'trait.professionalable.attributes.siren',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.siren,
    },
    {
        title: 'trait.professionalable.attributes.siret',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.siret,
    },
    {
        title: 'trait.professionalable.attributes.vat',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.vat,
    },
    {
        title: 'trait.professionalable.attributes.rcs',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.rcs,
    },
    {
        title: 'trait.professionalable.attributes.ape',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.ape,
    },
    {
        title: 'trait.professionalable.attributes.capital',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.capital,
    },
    {
        title: 'trait.professionalable.attributes.shortDescription',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.shortDescription,
    },
    {
        title: 'trait.professionalable.attributes.reference',
        group: group ?? 'trait.professionalable.group',
        variable: entity?.reference,
    },
];

// All the rows of a list view
export const getListRows = (t) => [
    {
        field: 'socialReason',
        headerName: t('trait.professionalable.attributes.socialReason'),
    },
    {
        field: 'legalForm',
        headerName: t('trait.professionalable.attributes.legalForm'),
    },
    {
        field: 'siren',
        headerName: t('trait.professionalable.attributes.siren'),
    },
    {
        field: 'siret',
        headerName: t('trait.professionalable.attributes.siret'),
    },
    { field: 'vat', headerName: t('trait.professionalable.attributes.vat') },
    { field: 'rcs', headerName: t('trait.professionalable.attributes.rcs') },
    { field: 'ape', headerName: t('trait.professionalable.attributes.ape') },
    {
        field: 'capital',
        headerName: t('trait.professionalable.attributes.capital'),
    },
    {
        field: 'shortDescription',
        headerName: t('trait.professionalable.attributes.shortDescription'),
    },
    {
        field: 'reference',
        headerName: t('trait.professionalable.attributes.reference'),
    },
];
