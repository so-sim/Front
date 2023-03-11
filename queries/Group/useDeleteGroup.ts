import { message } from './index';
import { deleteGroup, ServerResponse } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteGroup = () => {
  return useMutation<ServerResponse<null>, AxiosError, string>(deleteGroup, message);
};
