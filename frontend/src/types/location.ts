export interface Coords {
  lat: number;
  lng: number;
}

export interface DirectionsInfo {
  origin: Coords;
  destination: Coords;
}

export interface DestinationInfo extends Coords {
  name: string;
  category: string;
}
