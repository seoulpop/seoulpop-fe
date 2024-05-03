import { useQuery } from '@tanstack/react-query';

import { MarkerInfo } from '@/types/ar';
import { getArMarkerNearby } from '@/api/ar';

const useArMarkers = ({ lat, lng }: { lat?: number; lng?: number }) => {
  const { data: markerNearbyData, isLoading: isMarkerNearbyLoading } = useQuery<MarkerInfo[]>({
    queryKey: ['arMarkersNearby', { lat }, { lng }],
    queryFn: () => getArMarkerNearby(lat!, lng!),
    enabled: !!lat && !!lng,
  });

  return {
    markerNearbyData,
    isMarkerNearbyLoading,
  };
};

export default useArMarkers;
