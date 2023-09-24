import { reTakeToken } from '@/api/Auth';
import { useQuery } from '@tanstack/react-query';

export const useReTakeToken = () => {
  return useQuery(['token'], reTakeToken, {
    refetchInterval: 15000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
