import React from 'react';

export type Credentials = {
    apiKey: string;
    secretKey: string;
};

export type UserCredentials = {
    list: Credentials[] | [];
    current: Credentials | null;
};

export type Language = 'en' | 'pt';

export type Route = {
    exact: boolean;
    path: string;
    name: string;
    component: React.FC<{}>;
};

export type Coins = {
    asset: string;
    price: number;
    free: number;
    value: number;
    locked: number;
};

export type AllCoinsResponse = {
    prices: {
        totalAssetUSD: number;
        coinPrices: Coins[];
    };
};
