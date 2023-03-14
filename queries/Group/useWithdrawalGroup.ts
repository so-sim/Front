import { message } from './index';
import { withdrawalGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ServerResponse } from '@/types';

export const useWithdrawalGroup = () => {
  return useMutation<ServerResponse, AxiosError, string>(withdrawalGroup, message);
};
