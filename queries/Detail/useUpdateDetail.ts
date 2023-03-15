import { updateDetail } from '@/api/Detail';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDetail = () => {
  return useMutation(updateDetail);
};
