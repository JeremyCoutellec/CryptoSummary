import React, { Fragment } from 'react';
import PrivateRoute from './PrivateRoute';

/*
 * CRUD route by entity props
 */
const CrudRoutes = ({ entityName, componentList, componentAdd, componentShow }) => (
    <Fragment>
        <PrivateRoute exact path={'/' + entityName} component={componentList} />
        <PrivateRoute exact path={'/' + entityName + '/new'} component={componentAdd} />
        <PrivateRoute exact path={'/' + entityName + '-:id'} component={componentShow} />
    </Fragment>
);

export default CrudRoutes;
