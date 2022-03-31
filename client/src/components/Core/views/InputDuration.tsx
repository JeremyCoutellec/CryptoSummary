import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { isEqual, padStart, floor } from 'lodash';

// Material UI
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const InputDuration = ({ value, onChange = (value) => value, title, inputProps = {}, inlineInput = false, ...rest }) => {
    const [duration, setDuration] = useState(convertValueToDuration(value));
    const { t } = useTranslation();

    useEffect(() => {
        const newDuration = convertValueToDuration(value);
        if (!isEqual(newDuration, duration)) setDuration(newDuration);
    }, [value, duration]);

    const onInputChange = (event) => {
        onChange(
            moment
                .duration({
                    hours: duration.hours,
                    minutes: parseInt(duration.minutes),
                    [event.target.name]: event.target.value,
                })
                .asMinutes()
        );
    };

    if (inlineInput) {
        return (
            <Grid container spacing={2} padding={2}>
                <Grid item xs={7} sx={{ alignSelf: 'center' }}>
                    <Typography>{t(title)}</Typography>
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        label={t('common.hours')}
                        sx={{ width: '100px', marginRight: '5px' }}
                        variant="outlined"
                        margin="normal"
                        type="number"
                        inputProps={{
                            min: 0,
                            ...inputProps,
                        }}
                        value={duration?.hours}
                        onChange={onInputChange}
                        {...rest}
                        name="hours"
                    />
                    <TextField
                        label={t('common.minutes')}
                        sx={{ width: '100px' }}
                        variant="outlined"
                        margin="normal"
                        type="number"
                        inputProps={{
                            min: 0,
                            max: 59,
                            ...inputProps,
                        }}
                        value={duration?.minutes}
                        onChange={onInputChange}
                        {...rest}
                        name="minutes"
                    />
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <TextField
                    label={title + ' ( h )'}
                    variant="outlined"
                    margin="normal"
                    type="number"
                    inputProps={{
                        min: 0,
                        ...inputProps,
                    }}
                    value={duration?.hours}
                    onChange={onInputChange}
                    {...rest}
                    name="hours"
                />
            </Grid>
            <Grid item xs>
                <TextField
                    label={title + ' ( min )'}
                    variant="outlined"
                    margin="normal"
                    type="number"
                    inputProps={{
                        min: 0,
                        max: 59,
                        ...inputProps,
                    }}
                    value={duration?.minutes}
                    onChange={onInputChange}
                    {...rest}
                    name="minutes"
                />
            </Grid>
        </Grid>
    );
};

export const convertValueToDuration = (value, isHour = false) => {
    const duration = moment.duration(value, isHour ? 'h' : 'm');
    return {
        hours: floor(duration.asHours() ?? 0),
        minutes: padStart(duration.minutes().toString(), 2, '0'),
    };
};

export const convertValueToDurationString = (value, isHour = false, xs = false) => {
    const { hours, minutes } = convertValueToDuration(value, isHour);

    return xs ? `${hours}:${minutes}` : `${hours}h ${minutes}m`;
};

export default InputDuration;
