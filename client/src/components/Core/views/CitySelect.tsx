import React, { Fragment, useEffect, useState } from 'react';
import { City, State, Country } from 'country-state-city';
import { map, isEqual, filter, includes, debounce, lowerCase, take, join } from 'lodash';

// Material UI
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const CitySelect = ({ title = '', required = false, onChange = null, defaultValue = '', ...rest }) => {
    const [city, setCity] = useState(defaultValue);
    const [choices, setChoices] = useState([]);
    const allCities = City.getCitiesOfCountry('FR');

    const findCities = debounce(() => {
        let filterCities = [];
        if (city) {
            filterCities = filter(allCities, (cityToFind) => includes(lowerCase(cityToFind.name), lowerCase(city)));
            filterCities = map(filterCities, (cityToFind) => ({
                ...cityToFind,
                country: {
                    ...Country.getCountryByCode(cityToFind?.countryCode),
                },
                state: {
                    ...State.getStateByCodeAndCountry(cityToFind?.stateCode, cityToFind?.countryCode),
                },
            }));
        }
        if (!isEqual(choices, filterCities)) setChoices(filterCities);
    }, 300);

    useEffect(() => {
        findCities();
    }, [city, findCities]);

    const getLabelOfCity = (city) => join([city?.name, city?.state.name, city?.country?.name], ', ');

    return (
        <Fragment>
            <TextField
                variant="outlined"
                margin="normal"
                label={title}
                fullWidth
                required={required}
                value={city}
                onChange={(event) => setCity(event.target.value)}
                {...rest}
            />
            {map(take(choices, 10), (option, index) => (
                <MenuItem
                    key={index}
                    value={option.countryCode}
                    onClick={() => {
                        setCity(getLabelOfCity(option));
                        onChange(option);
                    }}
                >
                    {getLabelOfCity(option)}
                </MenuItem>
            ))}
        </Fragment>
    );
};

export default CitySelect;
