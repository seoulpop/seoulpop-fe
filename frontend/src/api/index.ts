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
