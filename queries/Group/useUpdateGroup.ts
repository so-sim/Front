import { message } from './index';
import { GroupId, GroupInfo, updateGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types';

export const useUpdateGroup = () => {
  return useMutation<ServerResponse<GroupId>, AxiosError, GroupInfo & GroupId>(updateGroup, message);
};
