import { useContext } from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import KeyIcon from "@material-ui/icons/VpnKey";

import CredentialsContext from "../../context/Credentials/CredentialsContext";

export const CredentialsList: React.FC = () => {
    const [credentials] = useContext(CredentialsContext);

    return (
        <List>
            {credentials.map((credential, index) => (
                <ListItem button key={index}>
                    <ListItemIcon>
                        <KeyIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={credential.apiKey}
                        secondary={credential.secretKey}
                    />
                </ListItem>
            ))}
        </List>
    );
};
