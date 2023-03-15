import { updateEvent } from '@/api/Event';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDetail = () => {
  return useMutation(updateEvent);
};
