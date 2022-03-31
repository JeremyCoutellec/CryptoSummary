import React, { Fragment } from 'react';
import clsx from 'clsx';

// Redux
import { connect } from 'react-redux';
import { getMenuSelector } from '../selectors/menu';

// Material UI
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

// Components
import Copyright from './Copyright';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(1),
        zIndex: 1,
    },
    contentShift: {
        transition: theme.transitions.create('padding', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        paddingLeft: 20 + drawerWidth,
    },
}));

const Footer = ({ isMenuOpen }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid
                className={clsx('footer', classes.footer, {
                    [classes.contentShift]: isMenuOpen,
                })}
            >
                <Copyright />
            </Grid>
        </Fragment>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => ({
    isMenuOpen: getMenuSelector(state)?.isOpen,
});

export default connect(mapStateToProps)(Footer);
