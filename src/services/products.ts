import { api } from './api';

export const getProducts = async (businessId?: string) => {
  const { data } = await api.get(`/products${businessId ? `?businessId=${businessId}` : ''}`);
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (product: any) => {
  const { data } = await api.post('/products', product);
  return data;
};

export const updateProduct = async (id: string, product: any) => {
  const { data } = await api.patch(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
