import { message } from './index';
import { withdrawalGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types/serverResponse';

export const useWithdrawalGroup = () => {
  return useMutation<ServerResponse, AxiosError, string>(withdrawalGroup, message);
};
