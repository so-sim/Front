import { DetailInfo, DetailStatusWithEventId, updateDetailStatus } from '@/api/Detail';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDetailStatus = () => {
  return useMutation<ServerResponse<DetailInfo>, AxiosError, DetailStatusWithEventId>(updateDetailStatus);
};
