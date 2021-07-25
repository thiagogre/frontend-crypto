import { Dispatch } from 'react';

import { Actions } from './actions';
import { Credentials } from '../models';

export enum Types {
    SetUser = 'USER',
    SetLoading = 'LOADING',
}

export type InitialStateType = {
    app: ApplicationControlsType;
    user: UserType;
};

export type ContextType = {
    state: InitialStateType;
    dispatch: Dispatch<Actions>;
};

export type ApplicationControlsType = {
    loading: boolean;
};

export type UserType = {
    credentials: Credentials[] | [];
};
