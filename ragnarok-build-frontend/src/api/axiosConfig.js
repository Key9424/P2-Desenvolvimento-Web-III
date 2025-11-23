// configuração do axios para chamadas à API
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // URL base da sua API // Ajuste conforme necessário
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
