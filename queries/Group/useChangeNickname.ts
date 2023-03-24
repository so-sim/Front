import { message } from './index';
import { changeNickname } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';

export const useChangeNickname = () => {
  return useMutation(changeNickname, message);
};
