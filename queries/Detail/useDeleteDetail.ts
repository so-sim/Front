import { deleteDetail } from '@/api/Detail';
import { useMutation } from '@tanstack/react-query';

export const useDeleteDetail = () => {
  return useMutation(deleteDetail);
};
