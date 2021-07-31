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

export const Home: React.FC = () => {
    const classes = useStyles();
    const { state } = useApplicationContext();
    const { translate } = useTranslate(state.app.language);

    return (
        <Container maxWidth="md">
            <List>
                <Link to="/table">
                    <ListItem button>
                        <ListItemIcon className={classes.listItemIcon}>
                            <TableIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="subtitle1" color="textPrimary">
                                {translate('ASSETS_TABLE')}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </Link>
            </List>
        </Container>
    );
};
