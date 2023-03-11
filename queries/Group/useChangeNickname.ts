import { message } from './index';
import { changeNickname, GroupId, GroupNickname, ServerResponse } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useChangeNickname = () => {
  return useMutation<ServerResponse<null>, AxiosError, GroupNickname & GroupId>(changeNickname, message);
};
