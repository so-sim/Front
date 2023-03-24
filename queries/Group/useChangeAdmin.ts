import { message } from './index';
import { changeAdmin } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useChangeAdmin = () => {
  return useMutation(changeAdmin, message);
};
