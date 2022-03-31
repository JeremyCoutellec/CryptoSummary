import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

// Redux
import { setAlert } from '../actions/alert';
import { connect } from 'react-redux';
import { uploadMediaObject } from '../../MediaBundle/actions/mediaObject';

// Material UI
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

// Components
import MediaObjectShow from '../../MediaBundle/views/MediaObjectShow';

const useStyles = makeStyles((theme) => ({
    textField: {
        '& fieldset': {
            borderColor: theme.palette.secondary.main + ' !important',
        },
    },
}));

const InputFile = ({ title = '', required = false, value, fullWidth = true, onChange = null, uploadMediaObject, setAlert, ...rest }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [file, setFile] = useState(undefined);

    const uploadFile = (e) => {
        const file = e.target.files[0];
        try {
            const formData = new FormData();
            formData.append('file', file);
            uploadMediaObject(formData, t).then((data) => {
                if (get(data, '@id')) onChange(get(data, '@id'));
            });
        } catch (error) {
            setAlert(error.message);
            setFile(undefined);
        }
    };
    return (
        <Fragment>
            <TextField
                InputLabelProps={{ shrink: true }}
                label={title}
                variant="outlined"
                margin="normal"
                fullWidth={fullWidth}
                type={'file'}
                required={required && !value}
                value={file}
                className={classes.textField}
                onChange={uploadFile}
                {...rest}
            />
            {value && (
                <Typography>
                    <MediaObjectShow mediaUri={value} />
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                            setFile(undefined);
                            onChange(null);
                        }}
                    >
                        <DeleteIcon />
                    </Button>
                </Typography>
            )}
        </Fragment>
    );
};
export default connect(null, { uploadMediaObject, setAlert })(InputFile);
