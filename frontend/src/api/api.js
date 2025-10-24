import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api'
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth-token');

        if (token) {
            config.headers['auth-token'] = token;
        }
        config.headers['Accept'] = 'application/form-data';

        return config;
    },
    (error) => {
        // Manejar errores de la configuración de la petición
        return Promise.reject(error);
    }
);


export default api;