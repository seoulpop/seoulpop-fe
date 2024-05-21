export type category = '문화재' | '3·1운동' | '6·25전쟁';

export interface ImageInfo {
  imageUrl: string;
  caption: string;
}

export interface HeritageInfo {
  category: string;
  id: number;
  thumbnail: string;
  name: string;
  label: string;
  registeredAt: string;
  description: string;
  additionalInfo?: string;
  era: string;
  address: string;
  images: ImageInfo[];
  lat: number;
  lng: number;
}

export interface SiteInfo {
  category: string;
  id: number;
  thumbnail: string;
  name: string;
  label: string;
  status: string;
  summary: string;
  description: string;
  historicAddress: string;
  address: string;
  reference: string;
  images: ImageInfo[];
  lat: number;
  lng: number;
}
