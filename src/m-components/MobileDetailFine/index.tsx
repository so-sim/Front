import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dateState } from '@/store/dateState';
import { DetailFilter } from '@/store/detailFilter';
import { useRecoilState } from 'recoil';
import MobileDetailFineList from './MobileDetailFineList';
import { useGetMobileDetailList } from '@/queries/Detail/useGetMobileDetailList';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import { SelectedEventInfo } from '@/types/event';
import FilterBottomSheet from '../BottomSheet/FilterBottomSheet';

import * as Style from './styles';
import MobileLayout from '@/layouts/Mobile/MobileLayout';
import MobileFilterController from './MobileFilterController';
import MobileDateController from './MobileDateController';
import MobileAllCheckbox from './MobileAllCheckbox';
import { ARROW } from '@/assets/icons/Arrow';
import MobileToolbar from './MobileToolbar';
import useCheckListState from '@/hooks/useCheckListState';

type GroupedData = {
  [key: string]: SelectedEventInfo[];
};

type Props = {
  $isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileDetailFine = ({ $isOpen, setIsOpen }: Props) => {
  const { groupId } = useParams();

  const [detailFilter, setDetailFilter] = useState<DetailFilter>({ nickname: '', situation: '', page: 0, size: 16, groupId: Number(groupId) });
  const [openFilterSheet, setOpenFilterSheet] = useState(false);

  const handleOpenFilterSheet = () => {
    setOpenFilterSheet((prev) => !prev);
  };

  const [calendarDate, setCalendarDate] = useRecoilState(dateState);

  const { data, hasNextPage, fetchNextPage } = useGetMobileDetailList(detailFilter, calendarDate);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const [GroupedListByDate, setGroupedListByDate] = useState({});

  useEffect(() => {
    setGroupedListByDate({});
  }, [calendarDate]);

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

  const details = (Object.values(GroupedListByDate).flat() as SelectedEventInfo[]) ?? [];

  const {
    checkedSize,
    setCheckDetailFine: { setInitCheckDetailFine },
  } = useCheckListState();

  useEffect(() => {
    setInitCheckDetailFine();
  }, [$isOpen]);

  return (
    <Style.MobileDetailFineFrame $isOpen={$isOpen}>
      <Style.MobileDetailFineHeader>
        <Style.ArrowButton onClick={() => setIsOpen(false)}>{ARROW.DOWN_LG_GRAY}</Style.ArrowButton>
        <MobileDateController />
        <MobileFilterController openFilterSheet={handleOpenFilterSheet} />
        <MobileAllCheckbox //
          details={details}
          totalAmount={1000000}
        />
      </Style.MobileDetailFineHeader>
      <MobileDetailFineList details={GroupedListByDate} />
      <div ref={ref} />

      {openFilterSheet && (
        <FilterBottomSheet //
          detailFilter={detailFilter}
          setDetailFilter={setDetailFilter}
          onClose={handleOpenFilterSheet}
        />
      )}
      {checkedSize > 0 && <MobileToolbar />}
    </Style.MobileDetailFineFrame>
  );
};

export default MobileDetailFine;
