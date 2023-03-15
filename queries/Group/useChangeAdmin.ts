import { message } from './index';
import { changeAdmin } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types/serverResponse';

export const useChangeAdmin = () => {
  return useMutation(changeAdmin, message);
};
