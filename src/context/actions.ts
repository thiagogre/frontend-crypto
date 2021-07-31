import { Feedback, Language } from '../models';
import { Types, UserType } from './types';

export type Actions =
    | { type: Types.SetUser; payload: UserType }
    | { type: Types.SetLanguage; payload: Language | string }
    | { type: Types.SetFeedback; payload: Feedback | undefined }
    | { type: Types.SetLoading; payload: boolean };
