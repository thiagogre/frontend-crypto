import Alert from '@material-ui/lab/Alert';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useApplicationContext } from '../../context';
import { Types } from '../../context/types';

export const Feedback = () => {
    const { dispatch, state } = useApplicationContext();

    return (
        <Collapse in={state.app.feedback?.visible} timeout={0}>
            <Alert
                variant="standard"
                severity={state.app.feedback?.type}
                color={state.app.feedback?.type}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            dispatch({
                                type: Types.SetFeedback,
                                payload: undefined,
                            });
                        }}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>
                {state.app.feedback?.message}
            </Alert>
        </Collapse>
    );
};
