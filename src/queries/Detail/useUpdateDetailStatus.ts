import { updateEventStatus } from '@/api/Event';
import { ToastPopUp } from '@/components/@common/Toast';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/constants/Toast';
import { Situation } from '@/types/event';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDetailStatus = (onSuccessUpdate?: (data: Situation) => void) => {
  const queryClient = useQueryClient();
  return useMutation(updateEventStatus, {
    onSuccess: (data) => {
      console.log(data.content.eventIdList.length);
      queryClient.invalidateQueries(['detailList']);
      queryClient.invalidateQueries(['monthStatus']);
      queryClient.invalidateQueries(['oneOfDetail']);
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.UPDATE_FINE });
      onSuccessUpdate && onSuccessUpdate(data.content.situation);
    },
  });
};
