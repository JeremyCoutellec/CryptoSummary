import React from 'react';

// Material UI
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    textField: {
        '& fieldset': {
            borderColor: theme.palette.secondary.main,
        },
    },
}));

//  eslint-disable-next-line @typescript-eslint/no-unused-vars
const InputBoolean = ({ title = '', required = false, value, group = null, ...rest }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={1} sx={{ alignItems: 'center' }}>
            <Grid item xs={'auto'}>
                <Typography variant="h6">{title}</Typography>
            </Grid>
            <Grid item xs>
                <Switch checked={value} required={required} color={value ? 'success' : 'secondary'} className={classes.textField} {...rest} />
            </Grid>
        </Grid>
    );
};

export default InputBoolean;
