import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
});

// Automatically attach JWT token to every outgoing request if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// If backend returns 401 Unauthorized, automatically clear token & redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the request was made to /auth/login or /auth/register
    const isAuthRequest = error.config?.url?.includes('/auth/');

    // Only redirect on 401 if it wasn't a login/register request
    if (error.response && error.response.status === 401 && !isAuthRequest) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default API;