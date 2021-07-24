import { createMuiTheme } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const palette: PaletteOptions = {
    type: 'dark',
    primary: {
        main: '#f8d12f',
        contrastText: '#000',
    },
    background: {
        default: '#181A20',
    },
};

const theme = createMuiTheme({ palette });

export default theme;
