import { useState } from 'react';
import { CssBaseline, PaletteType } from '@material-ui/core';

import { ApplicationProvider } from './context';
import { ApplicationThemeProvider } from './theme';
import { Routes } from './routes';

const App = () => {
    const storagedTheme = localStorage.getItem('@crypto:theme');

    const themeMatch = (type: string | null): PaletteType => {
        switch (type) {
            case 'dark':
                return 'dark';
            default:
                return 'light';
        }
    };

    const [mode, setMode] = useState<PaletteType>(themeMatch(storagedTheme));

    const toggleMode = () => {
        const theme = mode === 'dark' ? 'light' : 'dark';
        setMode(theme);
        localStorage.setItem('@crypto:theme', theme);
    };

    return (
        <ApplicationProvider>
            <ApplicationThemeProvider type={mode}>
                <CssBaseline />
                <Routes toggleMode={toggleMode} mode={mode} />
            </ApplicationThemeProvider>
        </ApplicationProvider>
    );
};

export default App;
