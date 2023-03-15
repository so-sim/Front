import { createEvent } from '@/api/Event';
import { useMutation } from '@tanstack/react-query';

export const useCreateDetail = () => {
  return useMutation(createEvent);
};
