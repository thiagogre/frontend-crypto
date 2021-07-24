import React, { useState } from 'react';

import CredentialsContext from './CredentialsContext';
import { Credentials } from '../../models';

const CredentialsProvider: React.FC = props => {
    const { children } = props;
    const credentialsState = useState<Credentials[]>([]);

    return (
        <CredentialsContext.Provider value={credentialsState}>
            {children}
        </CredentialsContext.Provider>
    );
};

export default CredentialsProvider;
