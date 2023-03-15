import { updateDetailStatus } from '@/api/Detail';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDetailStatus = () => {
  return useMutation(updateDetailStatus);
};
