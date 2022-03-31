import React, { memo } from 'react';
import clsx from 'clsx';

// Material UI
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles((theme) => ({
    accordion: {
        width: '100%',
    },
    accordionDetails: {
        border: '1px solid',
        borderColor: theme.palette.primary.dark,
        borderBottomLeftRadius: theme.spacing(0.5),
        borderBottomRightRadius: theme.spacing(0.5),
    },
    accordionSummary: {
        backgroundColor: theme.palette.primary.dark + '!important',
        color: 'white',
        '& .MuiAccordionSummary-content': {
            margin: '8px 0px',
        },
    },
    accordionSummaryFixed: {
        '&:hover': {
            cursor: 'default !important',
        },
        minHeight: theme.spacing(6) + '!important',
    },
    accordionTop: {
        borderTopLeftRadius: theme.spacing(0.5),
        borderTopRightRadius: theme.spacing(0.5),
    },
    accordionBottom: {
        borderBottomLeftRadius: theme.spacing(0.5),
        borderBottomRightRadius: theme.spacing(0.5),
    },
    expandMoreIcon: {
        marginRight: theme.spacing(2),
    },
    lightAccordion: {
        backgroundColor: theme.palette.secondary.light,
    },
    lightAccordionSummary: {
        backgroundColor: theme.palette.primary.light + '!important',
    },
    lightAccordionDetails: {
        borderColor: theme.palette.primary.light,
    },
}));

const WithAccordion = ({
    titleSummary,
    descriptionSummary = null,
    expanded = null,
    expandMoreIcon = null,
    expandedPanelName = '',
    onChange = null,
    elevation = 0,
    isFirst = false,
    isLast = false,
    light = false,
    classNameAccordionSummary = null,
    classNameAccordion = null,
    classNameAccordionDetails = null,
    childrenSummary = null,
    childrenRightSummary = null,
    children,
}) => {
    const classes = useStyles();

    return (
        <Accordion
            elevation={elevation}
            expanded={expanded}
            onChange={() => onChange && onChange(expandedPanelName)}
            className={clsx(classes.accordion, classNameAccordion, light && classes.lightAccordion)}
        >
            <AccordionSummary
                expandIcon={onChange && <ExpandMoreIcon />}
                aria-controls={expandedPanelName + 'a-content'}
                id={expandedPanelName + 'a-header'}
                className={clsx(
                    classes.accordionSummary,
                    !onChange && classes.accordionSummaryFixed,
                    light && classes.lightAccordionSummary,
                    isFirst && classes.accordionTop,
                    isLast && !expanded && classes.accordionBottom,
                    classNameAccordionSummary
                )}
            >
                {childrenSummary ?? (
                    <Grid container spacing={2}>
                        <Grid item xs className={clsx(childrenRightSummary && 'vertical-center-parent')}>
                            {expandMoreIcon && (
                                <Box className={'vertical-center'} sx={{ paddingRight: 2 }}>
                                    {expandMoreIcon}
                                </Box>
                            )}
                            <Box className={'vertical-center'}>
                                <Typography variant="h6">{titleSummary}</Typography>
                                {descriptionSummary && (
                                    <Typography variant="caption" sx={{ ml: 1, fontWeight: '400' }}>
                                        - {descriptionSummary}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={'auto'}>
                            {childrenRightSummary}
                        </Grid>
                    </Grid>
                )}
            </AccordionSummary>
            <AccordionDetails className={clsx(classes.accordionDetails, classNameAccordionDetails, light && classes.lightAccordionDetails)}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default memo(WithAccordion);
