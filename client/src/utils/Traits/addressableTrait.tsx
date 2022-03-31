import { State, Country } from 'country-state-city';
import { join, compact } from 'lodash';
/*
 * Trait used for the address information
 */

// All the rows of a form view
export const getFormRows = (formData, setFormData, t, group = null) => [
    {
        title: t('trait.addressable.attributes.address'),
        group: group ?? 'trait.addressable.group',
        id: 'address',
        type: 'text',
        min: 2,
        max: 80,
        value: formData.address,
        onChange: (e) =>
            setFormData({
                ...formData,
                address: e.target.value,
            }),
    },
    {
        title: t('trait.addressable.attributes.addressCpl'),
        group: group ?? 'trait.addressable.group',
        id: 'addressCpl',
        type: 'text',
        min: 2,
        max: 80,
        value: formData.addressCpl,
        onChange: (e) =>
            setFormData({
                ...formData,
                addressCpl: e.target.value,
            }),
    },
    {
        title: t('trait.addressable.attributes.city'),
        group: group ?? 'trait.addressable.group',
        id: 'city',
        type: 'city',
        min: 2,
        max: 50,
        value: formData.city,
        defaultValue:
            formData &&
            join(
                compact([
                    formData?.city,
                    State.getStateByCodeAndCountry(formData?.region, formData?.country)?.name,
                    Country.getCountryByCode(formData?.country)?.name,
                ]),
                ', '
            ),
        onChange: (option) =>
            setFormData({
                ...formData,
                city: option?.name,
                region: option?.state?.isoCode,
                country: option?.country?.isoCode,
            }),
    },
    {
        title: t('trait.addressable.attributes.gln'),
        group: group ?? 'trait.addressable.group',
        id: 'gln',
        type: 'text',
        min: 2,
        max: 20,
        value: formData.gln,
        onChange: (e) =>
            setFormData({
                ...formData,
                gln: e.target.value,
            }),
    },
];

// Get the object formated
export const getFormData = (entity) => ({
    address: entity?.address ?? '',
    addressCpl: entity?.addressCpl ?? '',
    zipCode: entity?.zipCode ?? '',
    city: entity?.city ?? '',
    region: entity?.region ?? '',
    country: entity?.country ?? '',
    gln: entity?.gln ?? '',
});

// All the rows of a show view
export const getShowRows = (entity, group = null) => [
    {
        title: 'trait.addressable.attributes.address',
        group: group ?? 'trait.addressable.group',
        variable: entity?.address,
    },
    {
        title: 'trait.addressable.attributes.addressCpl',
        group: group ?? 'trait.addressable.group',
        variable: entity?.addressCpl,
    },
    {
        title: 'trait.addressable.attributes.zipCode',
        group: group ?? 'trait.addressable.group',
        variable: entity?.zipCode,
    },
    {
        title: 'trait.addressable.attributes.city',
        group: group ?? 'trait.addressable.group',
        variable: join(
            compact([
                entity?.city,
                State.getStateByCodeAndCountry(entity?.region, entity?.country)?.name,
                Country.getCountryByCode(entity?.country)?.name,
            ]),
            ', '
        ),
    },
    {
        title: 'trait.addressable.attributes.gln',
        group: group ?? 'trait.addressable.group',
        variable: entity?.gln,
    },
];

// All the rows of a list view
export const getListRows = (t, full = true) =>
    full
        ? [
              {
                  field: 'address',
                  headerName: t('trait.addressable.attributes.address'),
              },
              {
                  field: 'addressCpl',
                  headerName: t('trait.addressable.attributes.addressCpl'),
              },
              {
                  field: 'zipCode',
                  headerName: t('trait.addressable.attributes.zipCode'),
              },
              {
                  field: 'city',
                  headerName: t('trait.addressable.attributes.city'),
              },
              {
                  field: 'region',
                  headerName: t('trait.addressable.attributes.region'),
              },
              {
                  field: 'country',
                  headerName: t('trait.addressable.attributes.country'),
              },
              {
                  field: 'gln',
                  headerName: t('trait.addressable.attributes.gln'),
              },
          ]
        : [
              {
                  field: 'address',
                  headerName: t('trait.addressable.attributes.address'),
              },
          ];
