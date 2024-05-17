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
    Geolocation.watchPosition({}, (position) => {
      if (position?.coords.latitude && position.coords.longitude) {
        setLocation({
          // lat: position.coords.latitude,
          // lng: position.coords.longitude,
          // 공원
          // lat: position.coords.latitude - 0.02079700000000173,
          // lng: position.coords.longitude + 0.31367950000000633,
          // 집
          lat: position.coords.latitude - 0.020960500000001048,
          lng: position.coords.longitude + 0.3145450000000096,
          error: null,
        });
      }
    }).then((id_) => {
      id = id_;
    });

    return () => {
      Geolocation.clearWatch({ id });
    };
  }, []);

  return location;
};

export default useCurrentLocation;
