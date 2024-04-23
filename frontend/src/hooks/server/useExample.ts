import { useQuery } from '@tanstack/react-query';

import { getPong } from '@/api/example';

const useExample = () =>
  useQuery<string>({
    queryKey: ['pong'],
    queryFn: getPong,
  });

export default useExample;
