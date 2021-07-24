import {
    MuiThemeProvider,
    Container,
    CssBaseline,
    Grid,
    makeStyles,
} from '@material-ui/core';

import theme from './theme';
import CredentialsProvider from './context/Credentials/CredentialsProvider';

import { Form } from './components/Form';
import { Title } from './components/Title';
import { CredentialsList } from './components/CredentialsList';

const useStyles = makeStyles(() => ({
    container: {
        padding: 20,
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <CredentialsProvider>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Container>
                    <Grid
                        container
                        direction="column"
                        className={classes.container}>
                        <Grid item xs={12}>
                            <Title>Binance Keys</Title>
                            <Form />
                            <CredentialsList />
                        </Grid>
                    </Grid>
                </Container>
            </MuiThemeProvider>
        </CredentialsProvider>
    );
};

export default App;
