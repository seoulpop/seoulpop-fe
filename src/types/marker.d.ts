import { category } from '@/types/history';

export interface MarkerInfo {
  id: number;
  lat: number;
  lng: number;
  name: string;
  category: category;
  visited?: boolean;
}

export interface MarkerNearbyInfo extends MarkerInfo {
  thumbnail: string;
  address: string;
}
