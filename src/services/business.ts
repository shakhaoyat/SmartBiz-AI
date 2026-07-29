import { api } from './api';

export const getBusinesses = async () => {
  const { data } = await api.get('/business');
  return data;
};

export const getBusiness = async (id: string) => {
  const { data } = await api.get(`/business/${id}`);
  return data;
};

export const createBusiness = async (business: any) => {
  const { data } = await api.post('/business', business);
  return data;
};

export const updateBusiness = async (id: string, business: any) => {
  const { data } = await api.patch(`/business/${id}`, business);
  return data;
};

export const deleteBusiness = async (id: string) => {
  const { data } = await api.delete(`/business/${id}`);
  return data;
};
