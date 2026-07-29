import { api } from './api';

export const getStats = async () => {
  const { data } = await api.get('/admin/stats');
  return data;
};

export const getAllUsers = async () => {
  const { data } = await api.get('/admin/users');
  return data;
};

export const getAllBusinesses = async () => {
  const { data } = await api.get('/admin/businesses');
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await api.delete(`/admin/users/${id}`);
  return data;
};
