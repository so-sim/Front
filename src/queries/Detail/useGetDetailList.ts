import { getDetailList } from '@/api/Event';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { detailFilterToQuery } from '@/utils/detailFilterToQuery';
import { DetailFilter } from '@/store/detailFilter';
import { DateState } from '@/store/dateState';
import { useRef } from 'react';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { Situation } from '@/types/event';

export const useGetDetailList = (detailFilter: DetailFilter, calendarDate: DateState) => {
  const detailFilterProperty = { ...detailFilter, startDate: dayjs(calendarDate.startDate).format('YYYY-MM-DD'), endDate: dayjs(calendarDate.endDate).format('YYYY-MM-DD') };

  const query = detailFilterToQuery(detailFilterProperty);
  const prevQuery = useRef({ ...detailFilter, mode: calendarDate.mode });

  return useQuery(['detailList', query, calendarDate], () => getDetailList(query), {
    enabled: !!query, //
    onSuccess(data) {
      if (prevQuery.current.nickname !== detailFilter.nickname) {
        pushDataLayer('filter_member', { state: true });
      }
      if (prevQuery.current.mode !== calendarDate.mode) pushDataLayer('filter_term', { state: calendarDate.mode });
      if (prevQuery.current.situation !== detailFilter.situation && detailFilter.situation !== '') {
        const situationCode: { [key in Situation]: string } = {
          미납: 'nonpayment',
          완납: 'fullpayment',
          확인중: 'confirming',
        };
        pushDataLayer('filter_payment', { state: situationCode[detailFilter.situation] });
      }
      prevQuery.current = { ...detailFilterProperty, mode: calendarDate.mode };
    },
  });
};
