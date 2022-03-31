import React, { useState, Fragment } from 'react';
import { isEqual, map } from 'lodash';
import clsx from 'clsx';

// Material UI
import { makeStyles } from '@mui/styles';
import TabsMui from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => ({
    tab: {},
    tabsSelected: {
        borderTopRightRadius: theme.spacing(1),
        borderTopLeftRadius: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
        color: 'white !important',
        borderBottom: 0,
    },
    tabsNotSelected: {
        borderTopRightRadius: theme.spacing(1),
        borderTopLeftRadius: theme.spacing(1),
        borderWidth: theme.spacing(0.1),
        borderStyle: 'solid',
        borderColor: theme.palette.primary.dark,
        borderBottom: 0,
    },
    borderPaper: {
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
    },
    tabContentSelected: {
        border: '1px solid ' + theme.palette.primary.main,
        padding: '5px 5px 5px 5px',
        borderTopLeftRadius: 'unset',
    },
}));

//  eslint-disable-next-line @typescript-eslint/no-unused-vars
const Tabs = ({ tabs, tabPanels, withBorder = false, ...rest }) => {
    const classes = useStyles();

    const [tabSelected, setTabSelected] = useState(0);

    return (
        <Fragment>
            <TabsMui {...rest} value={tabSelected} onChange={(_, newValue) => setTabSelected(newValue)} className={classes.tab}>
                {map(tabs, (tab, indexTab) => (
                    <Tab
                        key={indexTab}
                        className={clsx(tab?.className, isEqual(tabSelected, indexTab) ? classes.tabsSelected : classes.tabsNotSelected)}
                        label={tab?.label}
                        {...tab?.props}
                    />
                ))}
            </TabsMui>
            {map(tabPanels, (panel, indexPanel) => (
                <Paper
                    elevation={0}
                    role="tabpanel"
                    hidden={!isEqual(tabSelected, indexPanel)}
                    key={indexPanel}
                    className={clsx(panel?.props?.className, withBorder && classes.borderPaper, classes.tabContentSelected)}
                    {...panel?.props}
                >
                    {panel?.children}
                </Paper>
            ))}
        </Fragment>
    );
};

export default Tabs;
