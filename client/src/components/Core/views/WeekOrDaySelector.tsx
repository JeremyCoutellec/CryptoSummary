import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useMoment } from '../../../i18n/moment';
import { getDayOfDate, getDateByDayOfWeek } from '../../../utils/date';

// Material UI
import { useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// IF weekly use dateStart and dateEnd
// Else if daily only use dateStart
const WeekOrDaySelector = ({ dateStart, setDateStart, weekly = true, withWeekEnd = false }) => {
    const { t } = useTranslation();
    const moment = useMoment();
    const theme = useTheme();

    const removeSomeDays = () => {
        // If weekly remove 7 days
        // If daily remove 3 days if it's the monday
        // else remove 1 day
        // eslint-disable-next-line no-nested-ternary
        setDateStart(moment(dateStart).subtract(weekly ? 7 : getDayOfDate({ dateString: dateStart }) === 1 && !withWeekEnd ? 3 : 1, 'days'));
    };

    const addSomeDays = () => {
        // If weekly add 7 days
        // If daily add 3 days if it's the monday
        // else add 1 day
        // eslint-disable-next-line no-nested-ternary
        setDateStart(moment(dateStart).add(weekly ? 7 : getDayOfDate({ dateString: dateStart }) === 5 && !withWeekEnd ? 3 : 1, 'days'));
    };

    return (
        <Grid container spacing={1} sx={{ marginTop: 0 }}>
            <Grid item xs={'auto'} sx={{ paddingTop: 0 + '!important', display: 'inline-grid' }}>
                <Button size="small" sx={{ backgroundColor: theme.palette.error.light }} variant="contained" onClick={() => setDateStart(moment())}>
                    <Typography variant={'body1'}>{t('common.today')}</Typography>
                </Button>
            </Grid>
            <Grid item xs={'auto'} sx={{ paddingTop: 0 + '!important', display: 'inline-grid' }}>
                <Button size="small" sx={{ p: 0, minWidth: 32 }} color="primary" variant="contained" onClick={() => removeSomeDays()}>
                    <KeyboardArrowLeftIcon sx={{ margin: 0 }} className={'vertical-center'} />
                </Button>
            </Grid>
            <Grid
                item
                xs={'auto'}
                sx={{
                    paddingTop: ' 4px !important',
                    paddingBottom: '4px !important',
                    textAlign: 'center',
                    minWidth: weekly ? 230 : 130,
                }}
                className={'vertical-center-parent'}
            >
                <Typography variant={'body1'} component={'span'} className={'vertical-center'}>
                    {weekly ? (
                        <Fragment>
                            <Box
                                sx={{
                                    fontWeight: 'bold',
                                    display: 'inline-block',
                                }}
                            >
                                {t('common.week')} {getDateByDayOfWeek(1, false, dateStart)?.format('W')} :
                            </Box>{' '}
                            {t('common.rangeDate', {
                                dateStart: getDateByDayOfWeek(1, false, dateStart)?.format('DD'),
                                dateEnd: moment(getDateByDayOfWeek(7, true, dateStart))?.format('DD MMMM YYYY'),
                            })}
                        </Fragment>
                    ) : (
                        <Box sx={{ display: 'inline-block' }}>
                            {t(`interface.constants.day.${moment(dateStart).isoWeekday()}`)} {moment(dateStart)?.format('DD MMMM')}
                        </Box>
                    )}
                </Typography>
            </Grid>
            <Grid item xs={'auto'} sx={{ paddingTop: 0 + '!important', display: 'inline-grid' }}>
                <Button size="small" sx={{ p: 0, minWidth: 32 }} color="primary" variant="contained" onClick={() => addSomeDays()}>
                    <KeyboardArrowRightIcon sx={{ margin: 0 }} className={'vertical-center'} />
                </Button>
            </Grid>
        </Grid>
    );
};

export default WeekOrDaySelector;
