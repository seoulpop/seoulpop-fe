import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { MarkerInfo, MarkerNearbyInfo } from '@/types/marker';
import { getMarkerInfo, getMarkerNearby } from '@/api/markerInfo';
import { DEFAULT_MARKER_INFO } from '@/constants/map';

const useMaps = (lat: number = DEFAULT_MARKER_INFO.lat, lng: number = DEFAULT_MARKER_INFO.lng) => {
  const { data: markerData, isLoading: isMarkerLoading } = useQuery<MarkerInfo[]>({
    queryKey: ['marker'],
    queryFn: () => getMarkerInfo(),
  });

  const { data: markerNearbyData, isLoading: isMarkerNearbyLoading } = useQuery<MarkerNearbyInfo[]>(
    {
      queryKey: ['markerNearby', lat, lng],
      queryFn: () => getMarkerNearby(lat, lng),
      placeholderData: keepPreviousData,
    },
  );

  return {
    markerData,
    isMarkerLoading,
    markerNearbyData,
    isMarkerNearbyLoading,
  };
};

export default useMaps;
