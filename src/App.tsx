import { useState } from 'react';
import { CssBaseline, PaletteType } from '@material-ui/core';

import { ApplicationProvider } from './context';
import { ApplicationThemeProvider } from './theme';
import { Routes } from './routes';

import { Header } from './components/Header';

const App = () => {
    const [mode, setMode] = useState<PaletteType>('light');

    const toggleMode = () => {
        setMode(mode === 'dark' ? 'light' : 'dark');
    };

    return (
        <ApplicationProvider>
            <ApplicationThemeProvider type={mode}>
                <CssBaseline />
                <Header toggleMode={toggleMode} mode={mode} />
                <Routes />
            </ApplicationThemeProvider>
        </ApplicationProvider>
    );
};

export default App;
