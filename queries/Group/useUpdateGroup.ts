import { message } from './index';
import { updateGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useUpdateGroup = () => {
  return useMutation(updateGroup, message);
};
