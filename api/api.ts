import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost/api',
})

api.interceptors.request.use(function (config: AxiosRequestConfig) {
    const token = Cookies.get('XSRF-TOKEN')

    config.headers!['Authorization'] = `Bearer ${token}`;

    return config;
});

export default api