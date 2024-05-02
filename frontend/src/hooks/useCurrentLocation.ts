import { useState, useEffect } from 'react';

import { DEFAULT_MARKER_INFO } from '@/constants/map';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Position {
  coords: Coordinates;
}

interface GeoError {
  message: string;
}

interface Coords {
  lat: number;
  lng: number;
  error: string | null;
}

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Coords>({
    lat: DEFAULT_MARKER_INFO.lat,
    lng: DEFAULT_MARKER_INFO.lng,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prevState) => ({
        ...prevState,
        error: 'Geolocation is not supported by your browser.',
      }));
      return undefined;
    }

    const handleSuccess = (position: Position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        error: null,
      });
    };

    const handleError = (error: GeoError) => {
      setLocation((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    };

    const geoId = navigator.geolocation.watchPosition(handleSuccess, handleError);

    return () => navigator.geolocation.clearWatch(geoId);
  }, []);

  return location;
};

export default useCurrentLocation;
