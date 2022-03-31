import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { split, includes, forEach, startsWith } from 'lodash';

// Redux
import { connect } from 'react-redux';
import { setMenuOpen, togglePin } from '../actions/menu';
import { getUserAuthSelector } from '../selectors/auth';
import { getMenuSelector } from '../selectors/menu';

// Material UI
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PushPinIcon from '@mui/icons-material/PushPin';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        backgroundColor: theme.palette.secondary.light,
        width: drawerWidth,
    },
    toolbarIcon: {
        ...theme.mixins.toolbar,
    },
    bandeau: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 20,
    },
    staffAvatar: {
        marginTop: -24,
        marginBottom: 24,
    },
    menuNavBarItemActive: {
        borderLeftWidth: theme.spacing(0.5),
        borderLeftStyle: 'solid',
        borderLeftColor: theme.palette.secondary.dark,
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1.5),
    },
    menuNavBarItem: {
        color: theme.palette.primary.main,
        paddingTop: 0,
        paddingBottom: 0,
    },
    menuListItemIcon: {
        minWidth: theme.spacing(4),
    },
    menuNavBarItemIcon: {
        color: theme.palette.primary.main,
        fontSize: '24px',
    },
    menuNavBarItemText: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
    },
}));

const isActiveItem = ({ title, isManager = false, entity = null, entities = null }) => {
    // if the property entities is null
    // var entities is an array with one item ( entity )
    // else var entites is already set by the property
    entities ??= [entity];
    let isActive = false;
    const checkInTitle = split(title, '/');
    forEach(entities, (entity) => {
        if (startsWith(checkInTitle[isManager ? 2 : 1], entity) && (!isManager || includes(checkInTitle[1], 'manager'))) isActive = true;
    });
    return isActive;
};

const BandeauMenu = ({ text }) => {
    const classes = useStyles();
    return (
        <div className={classes.bandeau}>
            <Typography variant="body1">{text}</Typography>
        </div>
    );
};

const TextMenu = ({ text }) => {
    return <Typography variant="body2">{text}</Typography>;
};

const MainListItems = ({ user, title, handleDrawerClose, pin }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <Fragment>
            <List component="nav" className={clsx('menuNavBarItem', classes.menuNavBarItem)}>
                <Link to={'/dashboard'} className={classes.menuNavBarItemText} onClick={() => !pin && handleDrawerClose()}>
                    <ListItem button className={title === '/dashboard' ? classes.menuNavBarItemActive : ''}>
                        <ListItemIcon className={classes.menuListItemIcon}>
                            <DashboardIcon className={classes.menuNavBarItemIcon} />
                        </ListItemIcon>
                        <ListItemText primary={<TextMenu text={t('menu.link.main.dashboard')} />} />
                    </ListItem>
                </Link>
            </List>
        </Fragment>
    );
};

export const Menu = ({ user, setMenuOpen, isMenuOpen, pin, togglePin }) => {
    const location = useLocation();
    const classes = useStyles();
    const handleDrawerClose = () => {
        setMenuOpen(false);
    };
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(location?.pathname);
    }, [location]);

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            open={isMenuOpen}
        >
            <div className={clsx('toolbarIcon', classes.toolbarIcon)}>
                <IconButton onClick={togglePin}>
                    <PushPinIcon fontSize={'small'} color={pin ? 'primary' : 'secondary'} />
                </IconButton>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <MainListItems title={title} user={user} handleDrawerClose={handleDrawerClose} pin={pin} />
        </Drawer>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => ({
    isMenuOpen: getMenuSelector(state)?.isOpen,
    pin: getMenuSelector(state)?.pin,
    user: getUserAuthSelector(state),
});

export default connect(mapStateToProps, { togglePin, setMenuOpen })(Menu);
