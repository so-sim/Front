import { getMobileDetailList } from '@/api/Event';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { detailFilterToQuery } from '@/utils/detailFilterToQuery';
import { DetailFilter } from '@/store/detailFilter';
import { DateState } from '@/store/dateState';
import { useRef } from 'react';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { Situation } from '@/types/event';
import { all } from 'axios';

export const useGetMobileDetailList = (detailFilter: DetailFilter, calendarDate: DateState) => {
  const detailFilterProperty = { ...detailFilter, startDate: dayjs(calendarDate.startDate).format('YYYY-MM-DD'), endDate: dayjs(calendarDate.endDate).format('YYYY-MM-DD') };

  const query = Object.fromEntries(Object.entries(detailFilterProperty).filter(([_, v]) => v != ''));

  return useInfiniteQuery(['detailList', query, calendarDate], ({ pageParam = 0 }) => getMobileDetailList({ ...query, page: pageParam }), {
    enabled: !!query, //
    onSuccess(data) {},

    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.content.totalCount / lastPage.content.eventList.length <= allPage.length) return undefined;

      return allPage.length;
    },
  });
};
