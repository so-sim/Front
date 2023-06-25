import { updateEvent } from '@/api/Event';
import { ToastPopUp } from '@/components/@common/Toast';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { EventInfoTest } from '@/types/event';
import { ServerResponse } from '@/types/serverResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDetail = (onSuccessUpdateDetail: (data: ServerResponse<EventInfoTest>) => void) => {
  const queryClient = useQueryClient();
  return useMutation(updateEvent, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['detailList']);
      queryClient.invalidateQueries(['monthStatus']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_FINE });

      onSuccessUpdateDetail(data);
    },
  });
};
