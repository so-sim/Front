import { message } from './index';
import { joinGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useJoinGroup = () => {
  return useMutation(joinGroup, message);
};
