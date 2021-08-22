import { Link } from 'react-router-dom';
import {
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    makeStyles,
} from '@material-ui/core';
import TableIcon from '@material-ui/icons/TableChart';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { useApplicationContext } from '../context';
import { useTranslate } from '../hooks/useTranslate';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 20,
    },
    listItemIcon: {
        display: 'flex',
        alignItems: 'center',
    },
}));

type RouteProps = {
    pathname: string;
    icon: JSX.Element;
    name: string;
};

const Route: React.FC<RouteProps> = ({ pathname, icon, name }) => {
    const classes = useStyles();

    return (
        <Link to={pathname}>
            <ListItem button>
                <ListItemIcon className={classes.listItemIcon}>
                    {icon}
                </ListItemIcon>
                <ListItemText>
                    <Typography variant="subtitle1" color="textPrimary">
                        {name}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Link>
    );
};

export const Home: React.FC = () => {
    const { state } = useApplicationContext();
    const { translate } = useTranslate(state.app.language);

    const routes = [
        {
            pathname: '/assets',
            icon: <TableIcon />,
            name: translate('ASSETS'),
        },
        {
            pathname: '/dashboard',
            icon: <DashboardIcon />,
            name: translate('DASHBOARD'),
        },
    ];

    return (
        <Container maxWidth="md">
            <List>
                {routes.map(route => (
                    <Route
                        key={route.name}
                        pathname={route.pathname}
                        icon={route.icon}
                        name={route.name}
                    />
                ))}
            </List>
        </Container>
    );
};
