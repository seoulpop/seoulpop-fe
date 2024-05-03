import { api } from '@/api';
import { MarkerInfo } from '@/types/ar';

/**
 * ar 카메라, 반경 약 150m 역사, 문화재 정보 조회
 * @param lat
 * @param lng
 * @returns
 */
export const getArMarkerNearby = async (lat: number, lng: number): Promise<MarkerInfo[]> => {
  const response = await api.get(`/v1/histories/carousels?lat=${lat}&lng=${lng}&level=7`);
  return response.data;
};
