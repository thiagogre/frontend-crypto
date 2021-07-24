import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const url = {
    API_COINS: '/coins',
    API_PRICE: '/price',
};
