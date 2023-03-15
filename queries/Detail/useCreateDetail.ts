import { createDetail } from '@/api/Detail';
import { useMutation } from '@tanstack/react-query';

export const useCreateDetail = () => {
  return useMutation(createDetail);
};
