import React, { Fragment, useEffect, useRef, useState } from 'react';
import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Language } from '../../../i18n/Language';

// Redux
import { connect } from 'react-redux';
import { setLang } from '../actions/auth';
import { getLangSelector } from '../selectors/auth';

// Material UI
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';

const Lang = ({ lang, setLang }) => {
    const history = useHistory();
    const { i18n } = useTranslation();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const changeLanguage = (language: Language) => {
        setLang(language);
        history.go(0);
    };

    useEffect(() => {
        if (!lang) setLang(i18n.language);

        i18n.changeLanguage(lang ?? 'FR');
    }, [lang, setLang, i18n]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) anchorRef.current.focus();

        prevOpen.current = open;
    }, [open]);

    return (
        <Fragment>
            <Button ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
                <Flag code={lang === 'en' ? 'gb' : lang} width="24" />
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={() => changeLanguage(Language.FR)}>
                                        <Flag code="fr" width="24" />
                                        <span style={{ marginLeft: '8px' }}>Français</span>
                                    </MenuItem>
                                    <MenuItem onClick={() => changeLanguage(Language.EN)}>
                                        <Flag code="gb" width="24" />
                                        <span style={{ marginLeft: '8px' }}>English</span>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    );
};

// eslint-disable-next-line no-undef
const mapStateToProps = (state: never) => {
    return {
        lang: getLangSelector(state),
    };
};

export default connect(mapStateToProps, { setLang })(Lang);
