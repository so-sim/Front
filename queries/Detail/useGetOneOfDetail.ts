import { getOneOfDetail } from '@/api/Detail';
import { useQuery } from '@tanstack/react-query';

export const useGetOneOfDetail = (eventId: string) => {
  return useQuery(['oneOfDetail', eventId], () => getOneOfDetail(eventId));
};
