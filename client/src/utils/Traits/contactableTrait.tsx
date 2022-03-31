/*
 * Trait used for the contact information
 */

// All the rows of a form view
export const getFormRows = (formData, setFormData, t, group = null) => [
    {
        title: t('trait.contactable.attributes.email'),
        group: group ?? 'trait.contactable.group',
        id: 'email',
        type: 'email',
        min: 0,
        max: 80,
        value: formData.email,
        onChange: (e) =>
            setFormData({
                ...formData,
                email: e.target.value,
            }),
    },
    {
        title: t('trait.contactable.attributes.phone'),
        group: group ?? 'trait.contactable.group',
        id: 'phone',
        md: 6,
        type: 'tel',
        min: 0,
        max: 20,
        value: formData.phone,
        onChange: (e) =>
            setFormData({
                ...formData,
                phone: e.target.value,
            }),
    },
    {
        title: t('trait.contactable.attributes.mobile'),
        group: group ?? 'trait.contactable.group',
        id: 'mobile',
        type: 'tel',
        md: 6,
        min: 0,
        max: 20,
        value: formData.mobile,
        onChange: (e) =>
            setFormData({
                ...formData,
                mobile: e.target.value,
            }),
    },
    {
        title: t('trait.contactable.attributes.fax'),
        group: group ?? 'trait.contactable.group',
        id: 'fax',
        type: 'tel',
        min: 0,
        max: 20,
        value: formData.fax,
        onChange: (e) =>
            setFormData({
                ...formData,
                fax: e.target.value,
            }),
    },
    {
        title: t('trait.contactable.attributes.website'),
        group: group ?? 'trait.contactable.group',
        id: 'website',
        type: 'text',
        min: 0,
        max: 200,
        value: formData.website,
        onChange: (e) =>
            setFormData({
                ...formData,
                website: e.target.value,
            }),
    },
];

// Get the object formated
export const getFormData = (entity) => ({
    email: entity?.email ?? '',
    phone: entity?.phone ?? '',
    mobile: entity?.mobile ?? '',
    fax: entity?.fax ?? '',
    website: entity?.website ?? '',
});

// All the rows of a show view
export const getShowRows = (entity, group = null) => [
    {
        title: 'trait.contactable.attributes.email',
        group: group ?? 'trait.contactable.group',
        variable: entity?.email,
    },
    {
        title: 'trait.contactable.attributes.phone',
        group: group ?? 'trait.contactable.group',
        variable: entity?.phone,
    },
    {
        title: 'trait.contactable.attributes.mobile',
        group: group ?? 'trait.contactable.group',
        variable: entity?.mobile,
    },
    {
        title: 'trait.contactable.attributes.fax',
        group: group ?? 'trait.contactable.group',
        variable: entity?.fax,
    },
    {
        title: 'trait.contactable.attributes.website',
        group: group ?? 'trait.contactable.group',
        variable: entity?.website,
    },
];

// All the rows of a list view
export const getListRows = (t) => [
    { field: 'email', headerName: t('trait.contactable.attributes.email') },
    { field: 'phone', headerName: t('trait.contactable.attributes.phone') },
    { field: 'mobile', headerName: t('trait.contactable.attributes.mobile') },
    { field: 'fax', headerName: t('trait.contactable.attributes.fax') },
    { field: 'website', headerName: t('trait.contactable.attributes.website') },
];
