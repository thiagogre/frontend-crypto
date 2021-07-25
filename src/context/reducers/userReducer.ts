import { Actions } from '../actions';
import { Types, UserType } from '../types';

export const userReducer = (state: UserType, action: Actions) => {
    switch (action.type) {
        case Types.SetUser:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
