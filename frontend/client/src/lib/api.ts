import axios, { AxiosInstance } from 'axios';

let api: AxiosInstance;

if (process.env.NODE_ENV === 'development') {
  api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  });
} else {
  api = axios.create({
    baseURL: '/api/v1',
  });
}

export { api };
