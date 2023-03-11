import { message } from './index';
import { changeAdmin, GroupId, GroupNickname, ServerResponse } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useChangeAdmin = () => {
  return useMutation<ServerResponse<null>, AxiosError, GroupNickname & GroupId>(changeAdmin, message);
};
