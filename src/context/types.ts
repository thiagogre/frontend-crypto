import { Dispatch } from 'react';

import { Actions } from './actions';
import { UserCredentials, Language } from '../models';

export enum Types {
    SetUser = 'USER',
    SetLanguage = 'LANGUAGE',
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
    language: Language;
    loading: boolean;
};

export type UserType = {
    credentials: UserCredentials;
};
