import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

// Material UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

/**
 * 403 page access denied
 */
const AccessDeniedPage = () => {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1 className="x-large text-primary">
                        <i className="fas fa-exclamation-triangle" /> Accès refusé
                    </h1>
                </Grid>
                <Grid item xs={12}>
                    <p className="large">{t('common.accessDenied')}</p>
                    <Button size="small" title={t('common.goBack')} onClick={() => history.goBack()}>
                        <KeyboardReturnIcon />
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default AccessDeniedPage;
