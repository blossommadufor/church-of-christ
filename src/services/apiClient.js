import axios from "axios";

const BASE_URL = "https://cocnyanyaserver.onrender.com/api/v1";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
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

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Extract server-provided message if available
        if (error.response && error.response.data && error.response.data.message) {
            return Promise.reject(new Error(error.response.data.message));
        }
        // Fallback for network issues or unhandled exceptions
        return Promise.reject(error);
    }
);

export default apiClient;
