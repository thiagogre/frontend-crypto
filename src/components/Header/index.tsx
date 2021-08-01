import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    useMediaQuery,
    Menu,
    MenuItem,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import LightModeIcon from '@material-ui/icons/Brightness4';
import DarkModeIcon from '@material-ui/icons/Brightness7';
import TranslateIcon from '@material-ui/icons/Translate';
import MenuIcon from '@material-ui/icons/Menu';

import { useApplicationContext } from '../../context';
import { Types } from '../../context/types';
import { useTranslate } from '../../hooks/useTranslate';

type HeaderProps = {
    toggleMode: () => void;
    mode: string;
};

const useStyles = makeStyles(theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
        a: {
            textDecoration: 'none',
        },
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        padding: matches => matches && '10px 20px',
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
        fontWeight: 'bold',
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    menuButton: {
        display: 'flex',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: 5,
    },
    menuLink: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export const Header: React.FC<HeaderProps> = ({ toggleMode, mode }) => {
    const matches = useMediaQuery('(max-width:600px)');
    const classes = useStyles(matches);
    const { state, dispatch } = useApplicationContext();
    const { translate } = useTranslate(state.app.language);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const currentTheme =
        mode === 'dark' ? { color: '#f7f7f7' } : { color: '#303030' };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleLanguage = () => {
        const language = state.app.language === 'en' ? 'pt' : 'en';

        dispatch({
            type: Types.SetLanguage,
            payload: language,
        });

        localStorage.setItem('@crypto:language', language);
    };

    return (
        <AppBar position="static" elevation={0}>
            <Container className={classes.container} maxWidth="lg">
                <Typography
                    variant="h6"
                    noWrap
                    className={classes.toolbarTitle}>
                    <Link to={'/'} style={currentTheme}>
                        Crypto Dashboard
                    </Link>
                </Typography>
                {!matches ? (
                    <Toolbar className={classes.toolbar}>
                        <Link to={'/settings'}>
                            <IconButton>
                                <SettingsIcon color={'secondary'} />
                            </IconButton>
                        </Link>
                        <IconButton onClick={toggleMode}>
                            {mode === 'dark' ? (
                                <DarkModeIcon color={'secondary'} />
                            ) : (
                                <LightModeIcon color={'secondary'} />
                            )}
                        </IconButton>
                        <Button
                            onClick={toggleLanguage}
                            className={classes.menuButton}>
                            <TranslateIcon color={'secondary'} />
                            <Typography
                                variant="subtitle2"
                                color={'secondary'}
                                className={classes.toolbarTitle}>
                                {state.app.language}
                            </Typography>
                        </Button>
                    </Toolbar>
                ) : (
                    <>
                        <IconButton onClick={handleClick} size="small">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            <MenuItem onClick={handleClose}>
                                <Link
                                    to={'/settings'}
                                    className={classes.menuLink}
                                    style={currentTheme}>
                                    <SettingsIcon
                                        className={classes.menuIcon}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        className={classes.toolbarTitle}>
                                        {translate('SETTINGS')}
                                    </Typography>
                                </Link>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    toggleMode();
                                }}>
                                {mode === 'dark' ? (
                                    <>
                                        <LightModeIcon
                                            className={classes.menuIcon}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            className={classes.toolbarTitle}>
                                            {translate('LIGHT_MODE')}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <DarkModeIcon
                                            className={classes.menuIcon}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            className={classes.toolbarTitle}>
                                            {translate('DARK_MODE')}
                                        </Typography>
                                    </>
                                )}
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    toggleLanguage();
                                }}>
                                <TranslateIcon className={classes.menuIcon} />
                                <Typography
                                    variant="subtitle2"
                                    className={classes.toolbarTitle}>
                                    {state.app.language}
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Container>
        </AppBar>
    );
};
