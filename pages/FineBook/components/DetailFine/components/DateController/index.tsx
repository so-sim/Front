import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ARROW } from '@/assets/icons/Arrow';
import Button from '@/common/Button';
import * as Style from './styles';
import { useRecoilState } from 'recoil';
import { dateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { DateFilterProperty } from '@/pages/FineBook/utils/dateFilterToQuery';
import { FilterMode } from '../..';

interface DateControllerProps {
  mode: FilterMode;
  setMode: Dispatch<SetStateAction<FilterMode>>;
  setOpenAddModal: Dispatch<SetStateAction<boolean>>;
  dateFilter: DateFilterProperty;
  setDateFilter: Dispatch<SetStateAction<DateFilterProperty>>;
}

export const DateController: FC<DateControllerProps> = ({ mode, setMode, setOpenAddModal, dateFilter, setDateFilter }) => {
  const [{ selectedDate }, setSelectedDate] = useRecoilState(dateState);
  if (selectedDate == null) return null;

  const calculatedWeek = Math.ceil((dayjs(selectedDate).startOf('month').day() + dayjs(selectedDate).date()) / 7);

  const DateFilterTitle = (mode: FilterMode): string => {
    switch (mode) {
      case 'day':
        return `${Number(dayjs(selectedDate).month() + 1)}월 ${Number(dayjs(selectedDate).date())}일`;
      case 'week':
        const firstDay = dayjs(selectedDate).startOf('week');
        const lastDay = dayjs(firstDay).add(6, 'day');
        return `${Number(dayjs(firstDay).month() + 1)}월 ${Number(dayjs(firstDay).date())}일 - ${Number(dayjs(lastDay).month() + 1)}월 ${Number(dayjs(lastDay).date())}일`;
      default:
        return `${Number(dayjs(selectedDate).month() + 1)}월`;
    }
  };

  const increaseCalendarByMode = () => {
    setSelectedDate((prev) => ({ ...prev, selectedDate: dayjs(prev.selectedDate).add(1, mode), week: prev.week !== null ? prev.week + 1 : null }));
  };

  const decreaseCalendarByMode = () => {
    setSelectedDate((prev) => ({ ...prev, selectedDate: dayjs(prev.selectedDate).subtract(1, mode), week: prev.week !== null ? prev.week - 1 : null }));
  };

  return (
    <Style.DateController>
      <Style.ControllerFrame>
        <Style.Block>
          <Style.Date>{DateFilterTitle(mode)}</Style.Date>
          <Style.ArrowBlock>
            <Style.ArrowWrapper onClick={decreaseCalendarByMode}>{ARROW.LEFT}</Style.ArrowWrapper>
            <Style.ArrowWrapper onClick={increaseCalendarByMode}>{ARROW.RIGHT}</Style.ArrowWrapper>
          </Style.ArrowBlock>
        </Style.Block>
        <Style.Block>
          <Style.TodayButton onClick={() => setSelectedDate((prev) => ({ ...prev, selectedDate: dayjs() }))}>오늘</Style.TodayButton>
          <Style.FilterWrapper>
            <Style.FilterButton
              isActive={mode === 'month'}
              onClick={() => {
                if (mode === 'month') return;
                setSelectedDate((prev) => ({ ...prev, week: null }));
                setMode('month');
                setDateFilter((prev) => {
                  const { week, day, ...rest } = prev;
                  return { ...rest, page: 0 };
                });
              }}
            >
              월간
            </Style.FilterButton>
            <Style.FilterButton
              isActive={mode === 'week'}
              onClick={() => {
                if (mode === 'week') return;
                setDateFilter((prev) => {
                  const { day, ...rest } = prev;
                  return { ...rest, page: 0, week: calculatedWeek };
                });
                setMode('week');

                setSelectedDate((prev) => ({ ...prev, week: calculatedWeek }));
              }}
            >
              주간
            </Style.FilterButton>
            <Style.FilterButton
              isActive={mode === 'day'}
              onClick={() => {
                if (mode === 'day') {
                  return;
                }
                setMode('day');
                setSelectedDate((prev) => ({ ...prev, week: null }));
              }}
            >
              일간
            </Style.FilterButton>
          </Style.FilterWrapper>
        </Style.Block>
      </Style.ControllerFrame>
      <Button color="black" width="124px" height="40px" onClick={() => setOpenAddModal(true)}>
        내역 추가하기
      </Button>
    </Style.DateController>
  );
};

// const [filterList, setFilterList] = useState<Partial<EventFilter>>({ year: 2023 });
// const setFilter = (filter: Partial<EventFilter>) => {
//   setFilterList((prev) => {
//     const key = Object.keys(filter)[0];
//     if (Object.keys(prev).includes(key)) {
//       if (filter[key as keyof EventFilter] === prev[key as keyof EventFilter]) {
//         // const { key  ,...rest} = prev
//       }
//     }
//     // prev[Object.keys(filter)[0]]
//     // if(prev[])
//     return { ...prev, ...filter };
//   });
// };
