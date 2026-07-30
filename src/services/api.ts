import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return Cookies.get('token') || localStorage.getItem('token');
};

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const register = async (email: string, password: string, name: string) => {
  const { data } = await api.post('/auth/register', { email, password, name });
  return data;
};

export const googleAuth = async (googleId: string, email: string, name: string) => {
  const { data } = await api.post('/auth/google', { googleId, email, name });
  return data;
};
