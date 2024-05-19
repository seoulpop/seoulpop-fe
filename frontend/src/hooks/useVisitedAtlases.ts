import { ATLASES_DATA_KEY } from '@/constants/atlases';
import { LocalAtlases } from '@/types/atlases';
import { useEffect, useState } from 'react';

export const useVisitedAtlases = () => {
  const [visitedAtlases, setVisitedAtlases] = useState<LocalAtlases[]>([]);

  useEffect(() => {
    const localAtlasesData = localStorage.getItem(ATLASES_DATA_KEY);
    if (localAtlasesData) {
      setVisitedAtlases(JSON.parse(localAtlasesData));
    }
  }, []);

  return { visitedAtlases };
};
