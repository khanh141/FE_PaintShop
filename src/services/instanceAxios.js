import axios from 'axios';
import { KEYS } from '~/constants/keys';

axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem(KEYS.TOKEN);
        config.headers.Authorization = `Bearer ${token}`;
        console.log(token);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
});