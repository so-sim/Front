import { message } from './index';
import { changeAdmin, GroupId, GroupNickname } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types';

export const useChangeAdmin = () => {
  return useMutation<ServerResponse, AxiosError, GroupNickname & GroupId>(changeAdmin, message);
};
