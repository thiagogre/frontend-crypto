import { FormEvent, useContext, useRef } from 'react';
import { TextField, Button, Box } from '@material-ui/core';

import CredentialsContext from '../../context/Credentials/CredentialsContext';
import { useTranslate } from '../../hooks/useTranslate';

export const Form = () => {
    const { translate } = useTranslate();

    const [credentials, setCredentials] = useContext(CredentialsContext);

    const apiKeyRef = useRef<HTMLInputElement>(null);
    const secretKeyRef = useRef<HTMLInputElement>(null);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        setCredentials([
            ...credentials,
            {
                apiKey: apiKeyRef.current!.value,
                secretKey: secretKeyRef.current!.value,
            },
        ]);

        apiKeyRef.current!.value = '';
        secretKeyRef.current!.value = '';
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextField fullWidth label="API KEY" inputRef={apiKeyRef} />
                <TextField
                    fullWidth
                    label="SECRET KEY"
                    inputRef={secretKeyRef}
                />
                <Box mt={1}>
                    <Button type="submit" variant="contained" color="primary">
                        {translate('LABEL_SAVE')}
                    </Button>
                </Box>
            </form>
        </>
    );
};
