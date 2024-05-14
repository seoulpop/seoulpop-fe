import axios from 'axios';

export const apiUser = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('accessToken='));
    if (token) {
      config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
