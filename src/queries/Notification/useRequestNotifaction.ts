import { reqNotifications } from '@/api/Notification';
import { ToastPopUp } from '@/components/@common/Toast';
import { requestNotificationState } from '@/store/requestNotificationState';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

export const useRequestNotification = (onSuccessRequest?: () => void) => {
  const queryClient = useQueryClient();
  const [sendedNotificationEventId, setSendedNotificationEventId] = useRecoilState(requestNotificationState);

  return useMutation(reqNotifications, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['detailList']);
      onSuccessRequest && onSuccessRequest();
      ToastPopUp({ type: 'success', message: '요청이 완료되었습니다.' });
      setSendedNotificationEventId([...sendedNotificationEventId, ...variables]);
    },
  });
};
