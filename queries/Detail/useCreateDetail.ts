import { createEvent } from '@/api/Event';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(createEvent, {
    onSuccess() {
      queryClient.invalidateQueries(['detailList']);
    },
  });
};
