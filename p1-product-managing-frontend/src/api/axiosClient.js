import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:5054/api',
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
        return config;
    }

    if (['post', 'put', 'patch'].includes(config.method)) {
        config.headers['Content-Type'] = 'application/json';
    } else {
        delete config.headers['Content-Type']; // GET
    }

    return config;
});


axiosClient.interceptors.response.use(
    (response) => {
        if (
            response.config.responseType === 'blob' ||
            response.config.responseType === 'arraybuffer'
        ) {
            return response;
        }
        return response?.data ?? response;
    },
    (error) => {
        console.error('Lỗi API xảy ra:', error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
