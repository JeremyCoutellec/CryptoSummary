import { onChangeDefault } from '../../../utils/onChangeInput';
import { map } from 'lodash';

/**
 * getFormRows return an array of rows shown on skeleton form
 * formData is the data of the form
 * setFormData is the setter for updating formData
 * t is the function for the intl
 */
export const getFormRows = ({ formData, setFormData, t, allSkeletons = [] }) => [
    {
        title: t('common.attributes.name'),
        id: 'name',
        type: 'text',
        value: formData?.name,
        onChange: onChangeDefault(formData, setFormData),
        required: true,
    },
    {
        title: t('skeleton.attributes.referentSkeleton'),
        id: 'referentSkeleton',
        type: 'select',
        value: formData?.referentSkeleton,
        onChange: onChangeDefault(formData, setFormData),
        options: map(allSkeletons, (skeleton) => ({
            value: skeleton['@id'],
            title: skeleton.name,
        })),
    },
];

/**
 * getFormData is used for the initialization of the form
 */
export const getFormData = ({ skeleton = null }) => ({
    ...skeleton,
    name: skeleton?.name ?? '',
    referentSkeleton: skeleton?.referentSkeleton ?? undefined,
});

/**
 * getShowRows is used for the show view
 */
export const getShowRows = ({ skeleton, patchSkeleton, t }) => {
    let rows = [];

    rows = [
        {
            title: 'name',
            variable: skeleton?.name,
            editable: true,
            onChange: (value) => patchSkeleton(skeleton?.id, { name: value }, t),
        },
        {
            title: 'skeleton.attributes.referentSkeleton',
            variable: skeleton?.referentSkeleton,
            type: 'entity',
            entity: 'skeleton',
        },
    ];
    return rows;
};

/**
 * getListRows is used for the list view or used on the show view of an other entity
 */
export const getListRows = ({ t }) => [
    { field: 'name', headerName: t('common.attributes.name') },
    {
        field: 'referentSkeleton',
        headerName: t('skeleton.attributes.referentSkeleton'),
        fieldType: 'entity',
        entity: 'skeleton',
    },
];
