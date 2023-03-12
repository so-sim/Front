import { message } from './index';
import { GroupId, GroupNickname, joinGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types';

export const useJoinGroup = () => {
  return useMutation<ServerResponse, AxiosError, GroupNickname & GroupId>(joinGroup, message);
};
