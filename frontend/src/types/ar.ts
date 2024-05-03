import { category } from '@/types/history';

export interface MarkerInfo {
  id: number;
  lat: number;
  lng: number;
  name: string;
  category: category;
  visited?: boolean;
}
export interface Position {
  longitude: number;
  latitude: number;
}
export interface GeolocationCoordinates {
  detail: {
    position: Position;
  };
}
