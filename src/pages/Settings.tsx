import { useState, useRef } from 'react';
import {
    Container,
    Grid,
    FormGroup,
    TextField,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    makeStyles,
    IconButton,
    Collapse,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import KeyIcon from '@material-ui/icons/VpnKey';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import { useTranslate } from '../hooks/useTranslate';
import { useApplicationContext } from '../context';
import { Types } from '../context/types';
import { Credentials } from '../models';

import { Title } from '../components/Title';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 20,
    },
    formGroup: {
        margin: '16px 0',
    },
    textField: {
        margin: '4px 0',
    },
    box: {
        margin: '16px 0',
    },
    alert: { background: theme.palette.success.main },
}));

export const Settings: React.FC = () => {
    const { translate } = useTranslate();
    const classes = useStyles();
    const { dispatch, state } = useApplicationContext();

    const [invalid, setInvalid] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const apiKeyRef = useRef<HTMLInputElement>(null);
    const secretKeyRef = useRef<HTMLInputElement>(null);

    const onSave = () => {
        const updateCredentials = {
            ...state.user,
            credentials: [
                ...state.user.credentials,
                {
                    apiKey: apiKeyRef.current!.value,
                    secretKey: secretKeyRef.current!.value,
                },
            ],
        };

        dispatch({
            type: Types.SetUser,
            payload: updateCredentials,
        });

        localStorage.setItem(
            '@crypto:credentials',
            JSON.stringify(updateCredentials.credentials),
        );

        apiKeyRef.current!.value = '';
        secretKeyRef.current!.value = '';
    };

    const handleOnSave = () => {
        if (apiKeyRef?.current?.value && secretKeyRef?.current?.value) {
            onSave();
        } else {
            setInvalid(true);
        }
    };

    const handleDelete = (credentials: Credentials) => {
        const updateCredentials = state.user.credentials;

        const updatedCredentials = updateCredentials.filter(
            c => c.apiKey !== credentials.apiKey && c,
        );

        dispatch({
            type: Types.SetUser,
            payload: { credentials: updatedCredentials },
        });

        localStorage.setItem(
            '@crypto:credentials',
            JSON.stringify(updatedCredentials),
        );

        setDeleted(true);
    };

    return (
        <Container maxWidth="md">
            <Collapse in={invalid} timeout={0}>
                <Alert
                    variant="standard"
                    severity="warning"
                    color="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setInvalid(false);
                            }}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    {translate('ADD_THE_TWO_KEYS')}
                </Alert>
            </Collapse>
            <Collapse in={deleted} timeout={0}>
                <Alert
                    variant="standard"
                    severity="success"
                    color="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setDeleted(false);
                            }}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                    {translate('DELETED_KEYS')}
                </Alert>
            </Collapse>
            <Grid container direction="column" className={classes.container}>
                <Title>{`${translate('SETTINGS')} - Binance`}</Title>
                <FormGroup className={classes.formGroup}>
                    <TextField
                        className={classes.textField}
                        fullWidth
                        label={translate('API_KEY')}
                        inputRef={apiKeyRef}
                    />
                    <TextField
                        className={classes.textField}
                        fullWidth
                        label={translate('SECRET_KEY')}
                        inputRef={secretKeyRef}
                    />
                    <Box mt={1} className={classes.box}>
                        <Button
                            onClick={handleOnSave}
                            type="button"
                            variant="contained"
                            color={'primary'}>
                            {translate('SAVE')}
                        </Button>
                    </Box>
                </FormGroup>
                <List>
                    {state.user.credentials.map(
                        (credentials: Credentials, i: number) => (
                            <ListItem button key={i}>
                                <ListItemIcon>
                                    <KeyIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={credentials.apiKey}
                                    secondary={credentials.secretKey}
                                />
                                <ListItemIcon>
                                    <IconButton
                                        onClick={() =>
                                            handleDelete(credentials)
                                        }>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        ),
                    )}
                </List>
            </Grid>
        </Container>
    );
};
