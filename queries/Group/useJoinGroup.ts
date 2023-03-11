import { message } from './index';
import { GroupId, GroupNickname, joinGroup, ServerResponse } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useJoinGroup = () => {
  return useMutation<ServerResponse<null>, AxiosError, GroupNickname & GroupId>(joinGroup, message);
};
