import { createContext, useReducer, useContext, useEffect } from 'react';

import { ContextType, Types } from './types';
import { mainReducer } from './reducers';
import { Language, UserCredentials } from '../models';
import { api } from '../api/config';

const language: Language = 'en';

const initialState = {
    app: {
        language,
        loading: false,
    },
    user: { credentials: { list: [], current: null } },
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
            const storagedLanguage = localStorage.getItem('@crypto:language');

            if (storagedCredentials) {
                const credentials: UserCredentials =
                    JSON.parse(storagedCredentials);

                dispatch({
                    type: Types.SetUser,
                    payload: { credentials },
                });

                api.defaults.headers.get['api-key'] =
                    credentials.current?.apiKey;
                api.defaults.headers.get['api-secret'] =
                    credentials.current?.secretKey;
            }
            if (storagedLanguage) {
                dispatch({
                    type: Types.SetLanguage,
                    payload: storagedLanguage,
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
