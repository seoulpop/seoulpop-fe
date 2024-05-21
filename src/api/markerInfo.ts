import { api } from '@/api/index';
import { MarkerInfo, MarkerNearbyInfo } from '@/types/marker';

export const getMarkerInfo = async (): Promise<MarkerInfo[]> => {
  const response = await api.get(`/v1/histories`);
  return response.data;
};

export const getMarkerNearby = async (lat: number, lng: number): Promise<MarkerNearbyInfo[]> => {
  const response = await api.get(`/v1/histories/carousels?lat=${lat}&lng=${lng}&level=8`);
  return response.data;
};
