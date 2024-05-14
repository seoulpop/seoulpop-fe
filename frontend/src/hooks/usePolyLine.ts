import { useEffect, useState } from 'react';

import { getCarDirections } from '@/api/directions';
import { Coords, DestinationInfo } from '@/types/location';
import { CarDirectionsData } from '@/types/directions';

export const usePolyLine = (origin: Coords, destination: DestinationInfo) => {
  const [polyLine, setPolyLine] = useState<kakao.maps.Polyline>();
  const [bounds, setBounds] = useState<kakao.maps.LatLngBounds>();

  useEffect(() => {
    const fetchPolyline = async () => {
      const data: CarDirectionsData = await getCarDirections({
        origin: { lat: origin.lat, lng: origin.lng },
        destination,
      });
      const linePath: kakao.maps.LatLng[] = [];
      data.routes[0].sections[0].roads.forEach((router) => {
        router.vertexes.forEach((_vertex, index) => {
          if (index % 2 === 0) {
            linePath.push(
              new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]),
            );
          }
        });
      });
      setPolyLine(
        new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: 'var(--primary)',
          strokeOpacity: 0.8,
          strokeStyle: 'shortdash',
        }),
      );
      // eslint-disable-next-line no-underscore-dangle
      const bounds_ = new kakao.maps.LatLngBounds();
      linePath.forEach((path) => {
        bounds_.extend(path);
      });
      setBounds(bounds_);
    };
    fetchPolyline();
  }, [destination]);

  return { polyLine, bounds };
};
