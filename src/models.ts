import React from 'react';

export type Credentials = {
    apiKey: string;
    secretKey: string;
};

export type Route = {
    exact: boolean;
    path: string;
    name: string;
    component: React.FC<{}>;
};
