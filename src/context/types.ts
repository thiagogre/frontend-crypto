import { Dispatch } from 'react';

import { Actions } from './actions';
import { UserCredentials, Language, Feedback } from '../models';

export enum Types {
    SetUser = 'USER',
    SetLanguage = 'LANGUAGE',
    SetLoading = 'LOADING',
    SetFeedback = 'FEEDBACK',
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
    feedback: Feedback | undefined;
};

export type UserType = {
    credentials: UserCredentials;
};
