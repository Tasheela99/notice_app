import axios from "axios";
import BASE_URL from "./apiConfig.js";

const axiosInstance = axios.create({
    baseURL:BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        let token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('access_token=')) || null;
        token = token?.split('=')[1];
        config.headers.Authorization=token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;