import React, { Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { PENDING_REQUESTS } from '../../../utils/api';

// Redux
import { connect } from 'react-redux';
import { setMenuOpen } from '../actions/menu';
import { logout } from '../actions/auth';
import { refreshEntities } from '../actions/entities';
import { getMenuSelector } from '../selectors/menu';

// Material UI
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';

// Components
import Lang from './SwitchLang';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.main,
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuButtonHidden: {
        display: 'none',
    },
    buttonLogout: {
        cursor: 'pointer',
        padding: '6px 8px',
    },
    alignMiddle: {
        verticalAlign: 'middle',
    },
    companyInfos: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
    },
    logoCompany: {
        maxWidth: '5em',
        maxHeight: '3em',
    },
}));

export const NavBar = ({ pendingRequest, setMenuOpen, isMenuOpen, logout }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const handleDrawerOpen = () => {
        setMenuOpen(true);
    };

    useCallback(() => pendingRequest, [pendingRequest]);

    return (
        <Fragment>
            <AppBar position="fixed" className={clsx(classes.appBar, isMenuOpen && classes.appBarShift)} elevation={0}>
                <Toolbar className="toolbar">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, isMenuOpen && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Lang />
                    <Button
                        size="small"
                        color="primary"
                        className={classes.buttonLogout}
                        onClick={() => {
                            logout();
                        }}
                    >
                        <Typography variant="body1" color="inherit" noWrap>
                            <ExitToAppIcon className={classes.alignMiddle} />
                            <span className={classes.alignMiddle}>{t('common.logout')}</span>
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => {
    const pendingRequest = PENDING_REQUESTS;
    return {
        pendingRequest,
        isMenuOpen: getMenuSelector(state)?.isOpen,
    };
};

export default connect(mapStateToProps, {
    refreshEntities,
    setMenuOpen,
    logout,
})(NavBar);
