import { getOneOfEvent } from '@/api/Event';
import { useQuery } from '@tanstack/react-query';

export const useGetOneOfDetail = (eventId: number) => {
  return useQuery(['oneOfDetail', eventId], () => getOneOfEvent(eventId));
};
