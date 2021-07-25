import { Dispatch } from 'react';

import { Actions } from './actions';
import { UserCredentials, Language } from '../models';

export enum Types {
    SetUser = 'USER',
    SetLanguage = 'LANGUAGE',
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
};

export type UserType = {
    credentials: UserCredentials;
};
