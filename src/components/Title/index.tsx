import { Typography } from '@material-ui/core';

export const Title: React.FC = props => {
    const { children } = props;

    return (
        <Typography variant="h3" component="h1">
            {children}
        </Typography>
    );
};
