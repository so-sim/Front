import { getDetailList, getDetailListById } from '@/api/Event';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { detailFilterToQuery } from '@/utils/detailFilterToQuery';
import { DetailFilter } from '@/store/detailFilter';
import { DateState } from '@/store/dateState';
import { useRef } from 'react';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { Situation } from '@/types/event';

export const useGetDetailListById = (groupId: number | undefined, eventIds: number[]) => {
  const query = {
    groupId,
    eventIdsList: eventIds,
  };
  return useQuery(['detailListById', eventIds], () => getDetailListById(query), {
    enabled: !!query, //
  });
};
