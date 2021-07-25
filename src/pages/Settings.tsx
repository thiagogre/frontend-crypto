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
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import { useTranslate } from '../hooks/useTranslate';
import { useApplicationContext } from '../context';
import { Types } from '../context/types';
import { Credentials } from '../models';

import { Title } from '../components/Title';
import { api } from '../api/config';

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
    listItemIcon: {
        display: 'flex',
        alignItems: 'center',
    },
    boxCurrentIcon: {
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alert: { background: theme.palette.success.main },
}));

export const Settings: React.FC = () => {
    const { dispatch, state } = useApplicationContext();
    const { translate } = useTranslate(state.app.language);
    const classes = useStyles();

    const [invalid, setInvalid] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const apiKeyRef = useRef<HTMLInputElement>(null);
    const secretKeyRef = useRef<HTMLInputElement>(null);

    const onSave = () => {
        const updateCredentials = {
            ...state.user,
            credentials: {
                ...state.user.credentials,
                list: [
                    ...state.user.credentials.list,
                    {
                        apiKey: apiKeyRef.current!.value,
                        secretKey: secretKeyRef.current!.value,
                    },
                ],
            },
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
        const updateCredentials = state.user.credentials.list;

        const updatedCredentials = updateCredentials.filter(
            c => c.apiKey !== credentials.apiKey && c,
        );

        dispatch({
            type: Types.SetUser,
            payload: {
                credentials: {
                    ...state.user.credentials,
                    list: updatedCredentials,
                },
            },
        });

        localStorage.setItem(
            '@crypto:credentials',
            JSON.stringify(updatedCredentials),
        );

        setDeleted(true);
    };

    const setCurrentCrendetials = (credentials: Credentials) => {
        dispatch({
            type: Types.SetUser,
            payload: {
                credentials: {
                    ...state.user.credentials,
                    current: credentials,
                },
            },
        });

        localStorage.setItem(
            '@crypto:credentials',
            JSON.stringify({ ...state.user.credentials, current: credentials }),
        );

        api.defaults.headers.get['api-key'] = credentials?.apiKey;
        api.defaults.headers.get['api-secret'] = credentials?.secretKey;
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
                    {state.user.credentials.list.map(
                        (credentials: Credentials, i: number) => (
                            <ListItem button key={i}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <KeyIcon />
                                    {state.user.credentials.current?.apiKey ===
                                    credentials.apiKey ? (
                                        <Box className={classes.boxCurrentIcon}>
                                            <BookmarkIcon />
                                        </Box>
                                    ) : (
                                        <Box
                                            className={classes.boxCurrentIcon}
                                        />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={credentials.apiKey}
                                    secondary={credentials.secretKey}
                                    onClick={() =>
                                        setCurrentCrendetials(credentials)
                                    }
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
