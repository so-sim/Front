import { message } from './index';
import { deleteGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useDeleteGroup = () => {
  return useMutation(deleteGroup, message);
};
