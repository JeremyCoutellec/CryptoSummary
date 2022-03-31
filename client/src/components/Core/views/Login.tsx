import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { onChangeBoolean, onChangeDefault } from '../../../utils/onChangeInput';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, logout } from '../actions/auth';

// Material UI
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';

// Public
import logo from '../../../img/cryptoSummaryLogo.png';
import { getAuthSelector } from '../selectors/auth';

const Login = ({ login, logout, rememberMeStore, isAuthenticated }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: rememberMeStore,
    });
    const { email, password, rememberMe } = formData;

    useEffect(() => {
        if (isAuthenticated) logout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password, rememberMe, history);
    };

    return !isAuthenticated ? (
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
                    {t('common.login')}
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
                            minLength: 4,
                        }}
                        value={password}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="rememberMe"
                                defaultChecked={rememberMeStore}
                                onChange={onChangeBoolean(formData, setFormData)}
                                color="primary"
                            />
                        }
                        label={t('common.rememberMe').toString()}
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
                        {t('common.login')}
                    </Button>
                </form>
            </div>
        </Container>
    ) : (
        <div />
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    rememberMeStore: PropTypes.bool,
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => ({
    isAuthenticated: getAuthSelector(state)?.isAuthenticated,
    rememberMeStore: getAuthSelector(state)?.rememberMe,
});

export default connect(mapStateToProps, { login, logout })(Login);
