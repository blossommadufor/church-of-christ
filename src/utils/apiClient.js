import axios from 'axios';

// Replace with your actual base URL or keep default for proxy
const baseURL = import.meta.env.VITE_API_URL || '';
const token = localStorage.getItem('token');
console.log('Token', token)

export const apiClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
