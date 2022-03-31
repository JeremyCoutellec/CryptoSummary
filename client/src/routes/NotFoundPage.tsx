import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

// Material UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

/**
 * 404 page not found
 */
const NotFoundPage = () => {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1 className="x-large text-primary">
                        <i className="fas fa-exclamation-triangle" />
                        {t('common.pageNotFound.title')}
                    </h1>
                </Grid>
                <Grid item xs={12}>
                    <p className="large">{t('common.pageNotFound.description')}</p>
                    <Button size="small" title={t('common.goBack')} onClick={() => history.goBack()}>
                        <KeyboardReturnIcon />
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default NotFoundPage;
