import { Actions } from '../actions';
import { InitialStateType } from '../types';

import { applicationControlsReducer } from './applicationControlsReducer';
import { userReducer } from './userReducer';

export const mainReducer = (
    { app, user }: InitialStateType,
    action: Actions,
): any => ({
    app: applicationControlsReducer(app, action),
    user: userReducer(user, action),
});
