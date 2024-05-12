import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

import { DEFAULT_MARKER_INFO } from '@/constants/map';

interface Coords {
  lat: number;
  lng: number;
  error: string | null;
}

const useCurrentLocation = (): Coords => {
  const [location, setLocation] = useState<Coords>({
    lat: DEFAULT_MARKER_INFO.lat,
    lng: DEFAULT_MARKER_INFO.lng,
    error: null,
  });

  useEffect(() => {
    let id: string;
    Geolocation.watchPosition({}, (position: any) => {
      console.log('geolocation watched ', position?.coords.latitude, position?.coords.longitude);
      if (position?.coords.latitude && position.coords.longitude) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
        });
      }
    }).then((id) => (id = id));

    return () => {
      Geolocation.clearWatch({ id });
    };
  }, []);

  return location;
};

export default useCurrentLocation;
