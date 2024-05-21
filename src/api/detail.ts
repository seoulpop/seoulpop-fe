import { api } from '@/api/index';

export const getHistoryDetail = async (historyId: number = 1) => {
  const response = await api.get(`/v1/histories/${historyId}/detail`);
  return response.data;
};
