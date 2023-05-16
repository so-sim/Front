import { getEventList } from '@/api/Event';
import { ToastPopUp } from '@/components/@common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { DateFilterProperty, dateFilterToQuery } from '@/utils/dateFilter';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

export const useGetDetailList = (dateFilter: Partial<DateFilterProperty>, selectedDate: Dayjs | null, groupId: GroupId) => {
  const query = dateFilterToQuery(dateFilter);

  return useQuery(['detailList', query, selectedDate, groupId.groupId], () => getEventList(query, groupId));
};
