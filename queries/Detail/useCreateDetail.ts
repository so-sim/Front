import { createDetail, DetailInfo } from '@/api/Detail';
import { ServerResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateDetail = () => {
  return useMutation<ServerResponse<{ id: string }>, AxiosError, DetailInfo>(createDetail);
};
