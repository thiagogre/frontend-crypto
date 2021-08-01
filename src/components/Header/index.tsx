import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import LightModeIcon from '@material-ui/icons/Brightness4';
import DarkModeIcon from '@material-ui/icons/Brightness7';
import TranslateIcon from '@material-ui/icons/Translate';

import { useTranslate } from '../../hooks/useTranslate';
import { Link } from 'react-router-dom';
import { useApplicationContext } from '../../context';
import { Types } from '../../context/types';

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
            color: theme.palette.primary.contrastText,
        },
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
    languageButton: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export const Header: React.FC<HeaderProps> = ({ toggleMode, mode }) => {
    const { state, dispatch } = useApplicationContext();
    const { translate } = useTranslate(state.app.language);
    const classes = useStyles();

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
            <Container maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                    <Typography
                        variant="h6"
                        noWrap
                        className={classes.toolbarTitle}>
                        <Link to={'/'}>Crypto Dashboard</Link>
                    </Typography>
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
                        className={classes.languageButton}>
                        <TranslateIcon color={'secondary'} />
                        <Typography
                            variant="subtitle2"
                            color={'secondary'}
                            className={classes.toolbarTitle}>
                            {state.app.language}
                        </Typography>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
