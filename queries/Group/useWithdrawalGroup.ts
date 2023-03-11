import { message } from './index';
import { ServerResponse, withdrawalGroup } from '@/api/Group';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useWithdrawalGroup = () => {
  return useMutation<ServerResponse<null>, AxiosError, string>(withdrawalGroup, message);
};
