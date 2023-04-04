import { getEventList } from '@/api/Event';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { DateFilterProperty, dateFilterToQuery } from '@/pages/FineBook/utils/dateFilter';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

export const useGetDetailList = (dateFilter: Partial<DateFilterProperty>, selectedDate: Dayjs | null, groupId: GroupId) => {
  const query = dateFilterToQuery(dateFilter);

  return useQuery(['detailList', query, selectedDate, groupId.groupId], () => getEventList(query, groupId), {
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
    },
  });
};
