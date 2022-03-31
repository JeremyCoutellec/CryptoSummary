import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { PENDING_REQUESTS } from '../utils/api';

// Redux
import { connect } from 'react-redux';
import { getAuthSelector } from '../components/Core/selectors/auth';
import { getMenuSelector } from '../components/Core/selectors/menu';

// Material UI
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

// Models

// Layout
import NavBar from '../components/Core/views/NavBar';
import Menu from '../components/Core/views/Menu';
import Footer from '../components/Core/views/Footer';

// Component
import { logout } from '../components/Core/actions/auth';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    appBarSpacer: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        maxWidth: '2000px',
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

/**
 * Component used only by an authenticated user
 */
const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading, user },
    pendingRequest,
    loadUser,
    isMenuOpen,
    accessToken,
    refreshToken,
    logout,
    ...rest
}) => {
    const classes = useStyles();

    useEffect(() => {
        if (!accessToken && !refreshToken) logout();
    }, [accessToken, refreshToken, logout]);

    // get user by email
    useEffect(() => {
        if (isAuthenticated && user?.email && !user?.id) loadUser(localStorage.getItem('email'));
    }, [user, isAuthenticated, loadUser]);

    return (
        /**
         * redirect to the login page if the user is not authenticated
         */
        <Route
            {...rest}
            render={(props) =>
                !isAuthenticated || (!user?.id && !loading && pendingRequest === 0) ? (
                    <Redirect to="/login" />
                ) : (
                    <div className="root">
                        <NavBar />
                        <Menu />
                        <main
                            className={clsx(classes.content, {
                                [classes.contentShift]: isMenuOpen,
                            })}
                        >
                            <div className={classes.appBarSpacer} />
                            <Container maxWidth="lg" className={classes.container}>
                                <Grid container spacing={1}>
                                    <Component {...props} />
                                </Grid>
                            </Container>
                        </main>
                        <Footer />
                    </div>
                )
            }
        />
    );
};

// Redux connection
// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => {
    const pendingRequest = PENDING_REQUESTS;

    return {
        pendingRequest,
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        auth: getAuthSelector(state),
        isMenuOpen: getMenuSelector(state)?.isOpen,
    };
};

export default connect(mapStateToProps, {
    logout,
})(PrivateRoute);
