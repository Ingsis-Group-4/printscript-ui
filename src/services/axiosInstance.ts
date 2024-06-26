import axios from 'axios';
import Cookies from "js-cookie";

const getTokenFromCookies = (): string | null => {
    return Cookies.get('accessToken') || null;
};

const axiosInstance = axios.create();

// Agregar un interceptor de request para incluir el token en cada una de las requests
axiosInstance.interceptors.request.use((config) => {
    const token = getTokenFromCookies();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
