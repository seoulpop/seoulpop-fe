import { api } from '@/api/index';

export const getPong = async (): Promise<string> => {
  const response = await api.get(`/ping`);
  return response.data;
};
