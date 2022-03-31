import React from 'react';
import { useTranslation } from 'react-i18next';

// Material UI
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    dialogBody: {
        marginTop: theme.spacing(2),
    },
}));

const Modal = ({
    open = false,
    onClose = null,
    title = null,
    description = null,
    fullWidth = true,
    maxWidth = null,
    withoutCloseButton = false,
    dialogActionsChildren = null,
    children = null,
}) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Dialog fullWidth={fullWidth} maxWidth={maxWidth ?? 'md'} open={open} onClose={onClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                {description && (
                    <DialogContentText>
                        <Typography variant="caption" id="modal-description">
                            {description}
                        </Typography>
                    </DialogContentText>
                )}
                <div className={classes.dialogBody}>{children}</div>
            </DialogContent>
            <DialogActions>
                {!withoutCloseButton && <Button onClick={onClose}>{t('common.cancel')}</Button>}
                {dialogActionsChildren}
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
