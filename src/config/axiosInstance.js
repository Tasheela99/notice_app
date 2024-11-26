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

export const setAxiosHeaders = (token) =>{
    axiosInstance.interceptors.request.use(function (config) {
        config.headers.Authorization =  "Bearer " + token;
        return config;
    });
}


export const callAPI = async (method, endpoint, params) => {
    try {
        const response = await axiosInstance({
            method: method,
            url: endpoint,
            data: params,
        });
        return response;
    } catch (err) {
        throw err;
    }
};


export default axiosInstance;