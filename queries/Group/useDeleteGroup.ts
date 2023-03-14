import { message } from './index';
import { deleteGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types';

export const useDeleteGroup = () => {
  return useMutation<ServerResponse, AxiosError, string>(deleteGroup, message);
};
