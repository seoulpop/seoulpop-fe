import { useQuery } from '@tanstack/react-query';

import { getHistoryDetail } from '@/api/detail';

const useHistoryDetail = (historyId: number = 1) => {
  const { data: historyDetailData, isLoading: isHistoryDetailLoading } = useQuery<number>({
    queryKey: ['historyDetail', historyId],
    queryFn: () => getHistoryDetail(historyId),
  });

  return {
    historyDetailData,
    isHistoryDetailLoading,
  };
};

export default useHistoryDetail;
