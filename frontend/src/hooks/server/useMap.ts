import { useQuery } from '@tanstack/react-query';

import { MarkerInfo } from '@/types/marker';
import { getMarkerInfo } from '@/api/markerInfo';

const useMaps = () => {
  const { data: markerData, isLoading } = useQuery<MarkerInfo[]>({
    queryKey: ['marker'],
    queryFn: () => getMarkerInfo(),
  });

  return {
    markerData,
    isLoading,
  };
};

export default useMaps;
