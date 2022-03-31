import React from 'react';
import { formatDate } from '../../../utils/date';

// Material UI
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';

// Component
import CitySelect from './CitySelect';
import InputFile from './InputFile';
import InputDuration from './InputDuration';
import InputBoolean from './InputBoolean';
import InputSelect from './InputSelect';
import InputAutoComplete from './InputAutoComplete';

const useStyles = makeStyles((theme) => ({
    textField: {
        '& fieldset': {
            borderColor: theme.palette.secondary.main,
        },
    },
}));

const Input = ({ title = '', type = 'text', required = false, value, fullWidth = true, ...rest }) => {
    const classes = useStyles();
    if (type === 'datetime-local') value = formatDate(value, { isTimeStamp: false });

    switch (type) {
        case 'autoComplete':
            return <InputAutoComplete title={title} required={required} value={value} {...rest} />;
        case 'select':
            return <InputSelect title={title} required={required} value={value} {...rest} />;
        case 'boolean':
        case 'bool':
            return <InputBoolean title={title} required={required} value={value} {...rest} />;
        case 'city':
            return <CitySelect title={title} required={required} value={value} {...rest} />;
        case 'file':
            return <InputFile title={title} required={required} fullWidth={fullWidth} value={value} {...rest} />;
        case 'duration':
            return <InputDuration title={title} required={required} fullWidth={fullWidth} value={value} className={classes.textField} {...rest} />;
        default:
            return (
                <TextField
                    InputLabelProps={{
                        shrink:
                            type === 'date' ||
                            type === 'datetime-local' ||
                            type === 'time' ||
                            type === 'color' ||
                            !(value === null || value === '' || value === undefined),
                    }}
                    label={title}
                    variant="outlined"
                    margin="normal"
                    multiline={type === 'textarea'}
                    fullWidth={fullWidth}
                    type={type}
                    required={required}
                    value={value ?? undefined}
                    className={classes.textField}
                    {...rest}
                />
            );
    }
};

export default Input;
