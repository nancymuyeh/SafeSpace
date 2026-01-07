import axios, { AxiosInstance } from 'axios';

let api: AxiosInstance;

if (process.env.NODE_ENV === 'development') {
  api = axios.create({
    baseURL: 'http://localhost:3000',
  });
} else {
  api = axios.create({
    baseURL: 'http://backend:3000',
  });
}

export { api };
