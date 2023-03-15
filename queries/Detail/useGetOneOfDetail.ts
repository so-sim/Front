import { getOneOfEvent } from '@/api/Event';
import { useQuery } from '@tanstack/react-query';

export const useGetOneOfDetail = (eventId: string) => {
  return useQuery(['oneOfDetail', eventId], () => getOneOfEvent(eventId));
};
