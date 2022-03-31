import React from 'react';
import { map, isEqual, size, difference } from 'lodash';
import { useTranslation } from 'react-i18next';

// Material UI
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
    selectField: {
        '& fieldset': {
            borderColor: theme.palette.secondary.main,
        },
    },
}));

const InputSelect = ({
    title = '',
    options = null,
    multiple = false,
    required = false,
    value,
    onChange = null,
    name = '',
    fullWidth = true,
    selectAll = false,
    ...rest
}) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const selectAllChange = () =>
        onChange({
            target: { name, value: map(options, (option) => option.value) },
        });
    const deselectAllChange = () => onChange({ target: { name, value: [] } });
    const isAllSelected = () => {
        return (
            size(
                difference(
                    map(options, (option) => option.value),
                    value
                )
            ) === 0
        );
    };

    return (
        <Grid container spacing={1} sx={{ alignItems: 'center' }}>
            {multiple && selectAll && !isAllSelected() && (
                <Grid item xs={'auto'}>
                    <Button variant={'outlined'} onClick={selectAllChange}>
                        {t('common.selectAll')}
                    </Button>
                </Grid>
            )}
            {multiple && selectAll && isAllSelected() && (
                <Grid item xs={'auto'}>
                    <Button variant={'outlined'} onClick={deselectAllChange}>
                        {t('common.deselectAll')}
                    </Button>
                </Grid>
            )}
            <Grid item xs>
                <TextField
                    defaultValue={value ?? (multiple ? [] : null)}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                        shrink: !(value === null || value === '' || value === undefined || isEqual(value, Array(0))),
                    }}
                    label={title}
                    fullWidth={fullWidth}
                    select
                    required={required}
                    SelectProps={{
                        multiple,
                        displayEmpty: required,
                    }}
                    value={value ?? (multiple ? [] : null)}
                    className={classes.selectField}
                    onChange={onChange}
                    name={name}
                    {...rest}
                >
                    {value &&
                        size(options) === 0 &&
                        multiple &&
                        map(value, (valueItem, index) => (
                            <MenuItem key={index} value={valueItem}>
                                {valueItem}
                            </MenuItem>
                        ))}
                    {value && size(options) === 0 && !multiple && <MenuItem value={value}>{value}</MenuItem>}
                    {required && size(options) === 0 && <MenuItem value={''}>{t('common.notSpecified')}</MenuItem>}
                    {!required && !multiple && <MenuItem value={undefined}>{t('common.notSpecified')}</MenuItem>}
                    {map(options, (option, index) => (
                        <MenuItem key={index} value={option?.value} disabled={!!option?.disabled}>
                            {option.title}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    );
};

export default InputSelect;
