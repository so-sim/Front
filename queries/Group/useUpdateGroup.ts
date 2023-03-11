import { message } from './index';
import { GroupId, GroupInfo, ServerResponse, updateGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateGroup = () => {
  return useMutation<ServerResponse<GroupId>, AxiosError, GroupInfo & GroupId>(updateGroup, message);
};
