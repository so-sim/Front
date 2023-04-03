import { updateEventStatus } from '@/api/Event';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDetailStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEventStatus, {
    onSuccess() {
      queryClient.invalidateQueries(['detailList']);
    },
  });
};
