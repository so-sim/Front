import { getMonthStatus } from '@/api/Event';
import { useQuery } from '@tanstack/react-query';

export const useGetMonthStatus = (groupId: string | undefined, startDate: string, endDate: string) => {
  return useQuery(['monthStatus', groupId, startDate, endDate], () => getMonthStatus(groupId, startDate, endDate), {
    enabled: !!groupId,
  });
};
