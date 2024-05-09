import { useQuery } from '@tanstack/react-query';

import { getHistoryDetail } from '@/api/detail';
import { HeritageInfo, SiteInfo } from '@/types/history';

const useHistoryDetail = (historyId: number = 1) => {
  const { data: historyDetailData, isLoading: isHistoryDetailLoading } = useQuery<
    HeritageInfo | SiteInfo
  >({
    queryKey: ['historyDetail', historyId],
    queryFn: () => getHistoryDetail(historyId),
  });

  return {
    historyDetailData,
    isHistoryDetailLoading,
  };
};

export default useHistoryDetail;
