import { message } from './index';
import { GroupId, createGroup, deleteGroup, GroupInfo, ServerResponse, joinGroup, GroupNickname, withdrawalGroup, changeNickname, changeAdmin } from '@/api/Group';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateGroup = () => {
  return useMutation<ServerResponse<GroupId>, AxiosError, GroupInfo>(createGroup, message);
};
