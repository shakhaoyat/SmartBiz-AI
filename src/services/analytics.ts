import { api } from './api';

export const getAnalytics = async (businessId: string, startDate?: string, endDate?: string) => {
  const params = new URLSearchParams({ businessId });
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  const { data } = await api.get(`/analytics?${params.toString()}`);
  return data;
};
