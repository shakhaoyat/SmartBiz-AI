import { api } from './api';

export const getRecommendations = async (businessId: string) => {
  const { data } = await api.get(`/recommendations?businessId=${businessId}`);
  return data;
};

export const generateRecommendations = async (businessId: string) => {
  const { data } = await api.post('/recommendations/generate', { businessId });
  return data;
};

export const updateRecommendationStatus = async (id: string, status: string, feedback?: string) => {
  const { data } = await api.patch(`/recommendations/${id}`, { status, feedback });
  return data;
};
