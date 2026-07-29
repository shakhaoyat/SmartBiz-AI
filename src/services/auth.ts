import { api } from './api';

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

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};
