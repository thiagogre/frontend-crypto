import { ReactNode } from 'react';
import { createMuiTheme, ThemeProvider, colors } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

type ThemeProps = {
    type: 'dark' | 'light';
    children: ReactNode;
};

export const ApplicationThemeProvider: React.FC<ThemeProps> = ({
    type,
    children,
}) => {
    const palette: PaletteOptions = {
        type,
        primary: {
            light: colors.orange['A200'],
            main: colors.orange['A400'],
            dark: colors.orange['A700'],
            contrastText: '#303030',
        },
        secondary: {
            light: colors.grey['A200'],
            main: colors.grey['A400'],
            dark: colors.grey['A700'],
            contrastText: '#303030',
        },
    };

    const theme = createMuiTheme({ palette });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
