import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dateState } from '@/store/dateState';
import { DetailFilter } from '@/store/detailFilter';
import { useRecoilState } from 'recoil';
import { useGetDetailList } from '@/queries/Detail';
import MobileDetailFineList from './MobileDetailFineList';
import { useGetMobileDetailList } from '@/queries/Detail/useGetMobileDetailList';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import { EventInfoListTest, SelectedEventInfo } from '@/types/event';

type GroupedData = {
  [key: string]: SelectedEventInfo[];
};

const MobileDetailFine = () => {
  const { groupId } = useParams();

  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 3, groupId: Number(groupId) });

  const [calendarDate, setCalendarDate] = useRecoilState(dateState);

  useEffect(() => {
    setCalendarDate((prev) => ({ ...prev, startDate: dayjs('2023.08.09'), endDate: dayjs('2023.08.10') }));
  }, []);

  const { data, hasNextPage, fetchNextPage } = useGetMobileDetailList(detailFilter, calendarDate);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const [GroupedListByDate, setGroupedListByDate] = useState({});

  useEffect(() => {
    const groupedData: GroupedData = data?.pages.reduce((groups: any, page) => {
      page.content.eventList.forEach((item) => {
        const date = item.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
      });
      return groups;
    }, {});

    setGroupedListByDate((prev) => ({ ...prev, ...groupedData }));
  }, [data]);

  return (
    <>
      <div>데이트컨트롤러</div>
      <div>필터링 위치</div>

      <div>전체 체크박스</div>
      <MobileDetailFineList details={GroupedListByDate} />

      <div ref={ref} />
    </>
  );
};

export default MobileDetailFine;
