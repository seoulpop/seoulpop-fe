import { CarDirectionsData } from '@/types/directions';
import { DirectionsInfo } from '@/types/location';

export const getCarDirections = async ({
  origin,
  destination,
}: DirectionsInfo): Promise<CarDirectionsData> => {
  const url = 'https://apis-navi.kakaomobility.com/v1/directions';

  const headers = {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const queryParams = new URLSearchParams({
    origin: `${origin.lng},${origin.lat}`,
    destination: `${destination.lng},${destination.lat}`,
  });

  const requestUrl = `${url}?${queryParams}`;

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: CarDirectionsData = await response.json();
  return data;
};
