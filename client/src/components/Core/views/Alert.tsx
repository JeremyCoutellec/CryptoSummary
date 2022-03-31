import React, { Fragment } from 'react';
import map from 'lodash/map';

// Redux
import { useSelector } from 'react-redux';
import { getCoreAlertSelector } from '../selectors/auth';

// Material UI
import AlertMaterial from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Alert = () => {
    const alerts = useSelector(getCoreAlertSelector);
    return (
        <Fragment>
            {map(alerts, (alert, index) => (
                <AlertMaterial key={index} severity={alert.alertType} className="alertBox">
                    {alert?.title && <AlertTitle>{alert?.title}</AlertTitle>}
                    {alert.msg}
                </AlertMaterial>
            ))}
        </Fragment>
    );
};

export default Alert;
