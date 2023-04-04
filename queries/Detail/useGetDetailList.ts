import { getEventList } from '@/api/Event';
import { DateFilterProperty, dateFilterToQuery } from '@/pages/FineBook/utils/dateFilter';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';

export const useGetDetailList = (dateFilter: Partial<DateFilterProperty>, selectedDate: Dayjs | null, groupId: GroupId) => {
  const query = dateFilterToQuery(dateFilter);

  return useQuery(['detailList', query, selectedDate, groupId.groupId], () => getEventList(query, groupId), {
    onError(err) {
      console.log(err);
    },
  });
};
