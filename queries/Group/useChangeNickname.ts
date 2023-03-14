import { message } from './index';
import { changeNickname, GroupId, GroupNickname } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types';

export const useChangeNickname = () => {
  return useMutation<ServerResponse, AxiosError, GroupNickname & GroupId>(changeNickname, message);
};
