import { api } from './api';

export const sendAdvisorMessage = async (message: string, conversationId?: string) => {
  const { data } = await api.post('/ai/advisor', { message, conversationId });
  return data;
};

export const getConversations = async () => {
  const { data } = await api.get('/ai/conversations');
  return data;
};

export const getConversation = async (id: string) => {
  const { data } = await api.get(`/ai/conversations/${id}`);
  return data;
};
