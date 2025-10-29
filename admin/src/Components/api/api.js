import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true // <-- ¡MUY IMPORTANTE! Esto envía las cookies
});


export default api;