import { api } from '@/api/index';
import { MarkerInfo } from '@/types/marker';

export const getMarkerInfo = async (): Promise<MarkerInfo[]> => {
  const response = await api.get(`/v1/histories`);
  return response.data;
};
