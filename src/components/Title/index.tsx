import { Typography } from '@material-ui/core';

export const Title: React.FC = props => {
    const { children } = props;

    return <Typography variant="h5">{children}</Typography>;
};
