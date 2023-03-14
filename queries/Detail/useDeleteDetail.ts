import { createDetail, DataWithEventId, deleteDetail, DetailInfo } from '@/api/Detail';
import { ServerResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteDetail = () => {
  return useMutation<ServerResponse<{ eventId: string }>, AxiosError, DataWithEventId>(deleteDetail);
};
