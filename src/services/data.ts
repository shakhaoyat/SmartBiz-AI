import { api } from './api';
import { getBusinesses } from './business';

export const uploadDataset = async (file: File, businessId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('businessId', businessId);
  const { data } = await api.post('/data/upload', formData);
  return data;
};

export const getDatasets = async (businessId: string) => {
  const { data } = await api.get(`/data?businessId=${businessId}`);
  return data;
};

export const deleteDataset = async (id: string) => {
  const { data } = await api.delete(`/data/${id}`);
  return data;
};
