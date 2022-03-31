import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import NotFoundPage from './NotFoundPage';

// Layout
import Alert from '../components/Core/views/Alert';
import Login from '../components/Core/views/Login';
import TypoShow from '../components/Core/views/TypoShow';
import Register from '../components/Core/views/Register';

// Components

/**
 * All routes of the App
 *
 * Split by bundle to a better visualization
 */
const Routes = () => (
    <Fragment>
        <Alert />
        <Switch>
            {/*
                ---------- CORE BUNDLE ----------
            */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/typography" component={TypoShow} />

            {/*
                ---------- ERROR ROUTES ----------
            */}
            <Route component={NotFoundPage} />
        </Switch>
    </Fragment>
);

export default Routes;
