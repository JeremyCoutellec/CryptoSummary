import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { onChangeDefault } from '../../../utils/onChangeInput';

// Redux
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import { getAuthSelector } from '../selectors/auth';

// Material UI
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

// Public
import logo from '../../../img/cryptoSummaryLogo.png';
import Grid from '@mui/material/Grid';

const Register = ({ register, isAuthenticated }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordVerify: '',
    });
    const { email, password, passwordVerify } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
        register(email, password, passwordVerify, history);
    };

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div
                style={{
                    marginTop: '8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img src={logo} alt="Logo Crypto Summary" />
                <Typography component="h1" variant="h5">
                    {t('common.register')}
                </Typography>
                <p className="my-1" />
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type={'email'}
                        label={t('user.attributes.email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={onChangeDefault(formData, setFormData)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('user.attributes.password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChangeDefault(formData, setFormData)}
                        inputProps={{
                            minLength: 6,
                        }}
                        value={password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="passwordVerify"
                        label={t('user.attributes.passwordVerify')}
                        type="password"
                        id="passwordVerify"
                        autoComplete="current-passwordVerify"
                        onChange={onChangeDefault(formData, setFormData)}
                        inputProps={{
                            minLength: 6,
                        }}
                        value={password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{
                            margin: '3rem, 0, 2rem',
                        }}
                    >
                        {t('common.register')}
                    </Button>
                </form>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            {t('common.isRegister')}
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => ({
    isAuthenticated: getAuthSelector(state)?.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
