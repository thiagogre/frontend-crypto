import { Actions } from '../actions';
import { Types, ApplicationControlsType } from '../types';

export const applicationControlsReducer = (
    state: ApplicationControlsType,
    action: Actions,
) => {
    switch (action.type) {
        case Types.SetLoading:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};