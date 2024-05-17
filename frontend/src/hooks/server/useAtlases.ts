import { getAtlases } from '@/api/atlases';
import { AtlasesData } from '@/types/atlases';
import { useQuery } from '@tanstack/react-query';

const useAtlases = () => {
  const { data: atlasesData, isLoading: isAtlasesLoading } = useQuery<AtlasesData>({
    queryKey: ['atlases'],
    queryFn: getAtlases,
  });

  return { atlasesData, isAtlasesLoading };
};
export default useAtlases;
