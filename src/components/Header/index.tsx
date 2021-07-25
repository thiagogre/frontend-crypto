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
    },
    toolbarTitle: {
        flexGrow: 1,
        fontWeight: 'bold',
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
}));

export const Header: React.FC<HeaderProps> = ({ toggleMode, mode }) => {
    const { translate } = useTranslate();
    const classes = useStyles();

    return (
        <AppBar position="static" elevation={0}>
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        className={classes.toolbarTitle}>
                        Crypto Dashboard
                    </Typography>
                    {/* <IconButton>
                        <SettingsIcon color={'secondary'} />
                    </IconButton> */}
                    <IconButton onClick={toggleMode}>
                        {mode === 'dark' ? (
                            <DarkModeIcon color={'secondary'} />
                        ) : (
                            <LightModeIcon color={'secondary'} />
                        )}
                    </IconButton>
                    <Button
                        href="#"
                        variant="outlined"
                        color={'secondary'}
                        className={classes.link}>
                        {translate('LOGIN')}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
