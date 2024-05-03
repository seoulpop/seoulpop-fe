import { useQuery } from '@tanstack/react-query';

import { MarkerNearbyInfo } from '@/types/ar';
import { getArMarkerNearby } from '@/api/ar';

const useArMarkers = ({ lat, lng }: { lat: number; lng: number }) => {
  const { data: markerNearbyData, isLoading: isMarkerNearbyLoading } = useQuery<MarkerNearbyInfo[]>(
    {
      queryKey: ['arMarkersNearby', lat, lng],
      queryFn: () => getArMarkerNearby(lat, lng),
    },
  );

  return {
    markerNearbyData,
    isMarkerNearbyLoading,
  };
};

export default useArMarkers;
