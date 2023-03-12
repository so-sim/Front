import { getOneOfDetail, DetailInfo } from '@/api/Detail';
import { ServerResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetOneOfDetail = (eventId: string) => {
  return useQuery<ServerResponse<DetailInfo>>(['oneOfDetail', eventId], () => getOneOfDetail(eventId));
};
