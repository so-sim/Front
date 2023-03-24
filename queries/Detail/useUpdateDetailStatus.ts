import { updateEventStatus } from '@/api/Event';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDetailStatus = () => {
  return useMutation(updateEventStatus);
};
