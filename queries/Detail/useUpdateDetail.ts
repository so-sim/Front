import { DetailWithEventId, updateDetail, DetailInfo } from '@/api/Detail';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const useUpdateDetail = () => {
  return useMutation<ServerResponse<DetailInfo>, AxiosError, DetailWithEventId>(updateDetail);
};
