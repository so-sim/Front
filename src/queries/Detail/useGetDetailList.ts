import { getEventList } from '@/api/Event';
import { DetailFilter } from '@/utils/dateFilter/dateFilter';
import { GroupId } from '@/types/group';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { dateFilterToQuery } from '@/utils/dateFilterToQuery';

export const useGetDetailList = (dateFilter: Partial<DetailFilter>, selectedDate: Dayjs | null, groupId: GroupId) => {
  const query = dateFilterToQuery(dateFilter);

  return useQuery(['detailList', query, selectedDate, groupId.groupId], () => getEventList(query, groupId), { enabled: !!query });
};
