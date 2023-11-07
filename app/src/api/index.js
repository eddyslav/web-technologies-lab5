import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: baseUrl,
});

export const login = (body) => axiosClient.post('/login', body);

export const register = (body) => axiosClient.post('/register', body);
