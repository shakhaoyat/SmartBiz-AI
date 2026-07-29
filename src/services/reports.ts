import { api } from './api';

export const getReports = async (businessId: string) => {
  const { data } = await api.get(`/reports?businessId=${businessId}`);
  return data;
};

export const getReport = async (id: string, businessId: string) => {
  const { data } = await api.get(`/reports/${id}?businessId=${businessId}`);
  return data;
};

export const generateReport = async (businessId: string, type: string, title?: string) => {
  const { data } = await api.post('/reports/generate', { businessId, type, title });
  return data;
};

export const generateAIReport = async (businessId: string) => {
  const { data } = await api.post('/analytics/generate-ai-report', { businessId });
  return data;
};

export const deleteReport = async (id: string) => {
  const { data } = await api.delete(`/reports/${id}`);
  return data;
};
