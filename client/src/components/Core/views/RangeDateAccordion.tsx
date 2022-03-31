import React, { useState, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import moment from 'moment';

// Material UI
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

// Components
import Input from './Input';

const { REACT_APP_DATE_FORMAT } = process.env;

const useStyles = makeStyles(() => ({
    buttonInput: {
        '& .MuiInputBase-input ': {
            color: 'white !important',
        },
        '& .MuiInputBase-input::-webkit-calendar-picker-indicator': {
            filter: 'invert(1)',
        },
        '& label': {
            color: 'white !important',
        },
        '& fieldset': {
            borderColor: 'white !important',
        },
    },
}));

const RangeDateAccordion = ({ dateStart, setDateStart, dateEnd, setDateEnd }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [dateStartInput, setDateStartInput] = useState(dateStart);
    const [dateEndInput, setDateEndInput] = useState(dateEnd);

    const debouncedDateStart = useMemo(() => debounce(setDateStart, 500), [setDateStart]);
    const debouncedDateEnd = useMemo(() => debounce(setDateEnd, 500), [setDateEnd]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={'auto'}>
                <Input
                    type="date"
                    label={t('common.attributes.dateBegin')}
                    value={dateStartInput?.format(REACT_APP_DATE_FORMAT)}
                    name={'dateStart'}
                    InputProps={{
                        inputProps: {
                            max: dateEnd?.format(REACT_APP_DATE_FORMAT),
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.buttonInput}
                    onChange={(e) => {
                        const date = e.target.value ? moment(e.target.value) : null;
                        setDateStartInput(date);
                        debouncedDateStart(e);
                    }}
                    size="small"
                    sx={{ marginTop: 1, marginBottom: 0 }}
                />
            </Grid>
            <Grid item xs={'auto'}>
                <Input
                    type="date"
                    label={t('common.attributes.dateEnd')}
                    value={dateEndInput?.format(REACT_APP_DATE_FORMAT)}
                    name={'dateEnd'}
                    InputProps={{
                        inputProps: {
                            min: dateStart?.format(REACT_APP_DATE_FORMAT),
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.buttonInput}
                    onChange={(e) => {
                        const date = e.target.value ? moment(e.target.value) : null;
                        setDateEndInput(date);
                        debouncedDateEnd(e);
                    }}
                    size="small"
                    sx={{ marginTop: 1, marginBottom: 0 }}
                />
            </Grid>
        </Grid>
    );
};

export default memo(RangeDateAccordion);
