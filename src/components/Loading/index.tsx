import React from 'react';
import { CircularProgress, Box } from '@material-ui/core/';

export const Loading: React.FC = () => {
    return (
        <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <CircularProgress disableShrink />
        </Box>
    );
};
