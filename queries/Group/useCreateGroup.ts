import { message } from './index';
import { createGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useCreateGroup = () => {
  return useMutation(createGroup, message);
};
