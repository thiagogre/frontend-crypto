import { createContext, useReducer, useContext, useEffect } from 'react';

import { ContextType, Types } from './types';
import { mainReducer } from './reducers';
import { Credentials } from '../models';

const initialState = {
    app: {
        loading: false,
    },
    user: { credentials: [] },
};

const ApplicationContext = createContext<ContextType>({
    state: initialState,
    dispatch: () => null,
});

export const ApplicationProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    useEffect(() => {
        function loadStoragedData() {
            const storagedCredentials = localStorage.getItem(
                '@crypto:credentials',
            );

            if (storagedCredentials) {
                const credentials: Credentials[] =
                    JSON.parse(storagedCredentials);

                dispatch({
                    type: Types.SetUser,
                    payload: { credentials },
                });
            }
        }

        loadStoragedData();
    }, []);

    return (
        <ApplicationContext.Provider value={{ state, dispatch }}>
            {children}
        </ApplicationContext.Provider>
    );
};

export const useApplicationContext = () => useContext(ApplicationContext);
