import { message } from './index';
import { deleteGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types/serverResponse';

export const useDeleteGroup = () => {
  return useMutation<ServerResponse, AxiosError, string>(deleteGroup, message);
};
