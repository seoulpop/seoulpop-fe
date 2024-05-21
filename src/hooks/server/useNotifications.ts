import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getNotifications, patchNotifications } from '@/api/notification';
import { NotificationsData } from '@/types/notification';

const useNotifications = () => {
  const { data: notificationsData, isLoading: isNotificationsLoading } =
    useQuery<NotificationsData>({
      queryKey: ['notifications'],
      queryFn: () => getNotifications(),
    });

  const queryClient = useQueryClient();
  const notificationMutation = useMutation({
    mutationFn: patchNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    notificationsData,
    isNotificationsLoading,
    notificationMutation,
  };
};

export default useNotifications;
