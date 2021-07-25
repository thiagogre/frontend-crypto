import { Language } from '../models';
import { Types, UserType } from './types';

export type Actions =
    | { type: Types.SetUser; payload: UserType }
    | { type: Types.SetLanguage; payload: Language };
