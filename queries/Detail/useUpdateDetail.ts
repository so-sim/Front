import { updateEvent } from '@/api/Event';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEvent, {
    onSuccess() {
      queryClient.invalidateQueries(['detailList']);
    },
  });
};
