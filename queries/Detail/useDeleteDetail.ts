import { deleteEvent } from '@/api/Event';
import { useMutation } from '@tanstack/react-query';

export const useDeleteDetail = () => {
  return useMutation(deleteEvent);
};
