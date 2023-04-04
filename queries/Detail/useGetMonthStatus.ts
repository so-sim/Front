import { getMonthStatus } from '@/api/Event';
import { useQuery } from '@tanstack/react-query';

export const useGetMonthStatus = (groupId: string | undefined, year: string, month: string) => {
  return useQuery(['monthStatus', groupId, year, month], () => getMonthStatus(groupId, year, month), {
    enabled: !!groupId,
  });
};
