import { Types, UserType } from './types';

export type Actions =
    | { type: Types.SetUser; payload: UserType }
    | { type: Types.SetLoading; payload: boolean };
