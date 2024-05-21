import { useMutation } from '@tanstack/react-query';

import { poseHeritageVisited } from '@/api/ar';

const useHeritageVisited = () => {
  const heritageVisitedMutation = useMutation({ mutationFn: poseHeritageVisited });
  return heritageVisitedMutation;
};

export default useHeritageVisited;
