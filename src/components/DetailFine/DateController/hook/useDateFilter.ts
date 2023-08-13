import { FilterMode } from '@/pages/FineBook/DetailFine';
import { dateState, DateState, initialDateState } from '@/store/dateState';
import { weekList } from '@/utils/customedWeek';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { DateFilter } from './DateFilter';

export type FilterModeTest = FilterMode | 'custom';

export const useDateFilter = () => {
  const [calendarDate, setCalendarDate] = useRecoilState(dateState);
  const [currentWeek, setCurrentWeek] = useState(0);

  const dateFilter = new DateFilter(calendarDate.mode);

  const goToWeek = (weekText: string) => {
    const week = weekList.indexOf(weekText) + 1;
    setCurrentWeek(week);
    const baseDate = moveDateToWeek(calendarDate.baseDate, week);
    setCalendarDate(baseDate);
  };

  const increaseDate = () => {
    const changedDateState = dateFilter.increaseDateByMode(calendarDate);
    setCalendarDate(changedDateState);
  };

  const decreaseDate = () => {
    const changedDateState = dateFilter.decreaseDateByMode(calendarDate);
    setCalendarDate(changedDateState);
  };

  const getTitle = () => {
    const dateTitle = dateFilter.getTitle(calendarDate);
    return dateTitle;
  };

  const initializeFilter = () => {
    setCalendarDate(initialDateState);
  };

  const changeDateByButtonMode = (buttonMode: FilterModeTest) => {
    const changedDateState = dateFilter.updateDateByButtonMode(calendarDate, buttonMode);
    setCalendarDate(changedDateState);

    // week를 구하는 로직
    const startDay = dayjs(changedDateState.baseDate).startOf('month').day();
    const baseDate = dayjs(changedDateState.baseDate).date();
    const week = Math.floor((startDay - 1 + baseDate) / 7) + 1;
    setCurrentWeek(week);
  };

  /**
   * PC에서는 필요 없었는데, 모바일에서는 동작이 달라서 필요하더라구요..
   * 동작방식 궁금하시면 여쭤봐주세요..!!
   */
  const changeDateByCustomMode = ({ endDate }: { endDate: Dayjs }) => {
    const changedStartDate = endDate.subtract(1, 'week');
    const changedDateState = {
      baseDate: changedStartDate,
      startDate: changedStartDate,
      endDate,
      mode: 'custom' as FilterMode,
    };
    setCalendarDate(changedDateState);
  };

  return { increaseDate, decreaseDate, getTitle, changeDateByButtonMode, goToWeek, changeDateByCustomMode, currentWeek, initializeFilter };
};

export function moveDateToWeek(baseDate: Dayjs, week: number): DateState {
  const startOfMonthDay = dayjs(baseDate).set('date', 1).startOf('month').day();
  // 해당 달의 시작하는 요일을 찾는 것.
  // day가 요일 date가 날짜.
  const startOfWeekDate = (week - 1) * 7 + 1 - startOfMonthDay;
  // 선택된 week에 시작하는 날짜를 알아낼 수 있음.  (은근 날짜에 이쁜 패턴이 많다)
  if (week === 1) {
    const startDateOfMonth = dayjs(baseDate).startOf('month');
    return {
      baseDate: startDateOfMonth, //
      startDate: startDateOfMonth.startOf('week'),
      endDate: startDateOfMonth.endOf('week'),
      mode: 'week' as FilterMode,
    };
  }

  const startDate = dayjs(baseDate).set('date', startOfWeekDate);
  const endDate = dayjs(baseDate).set('date', startOfWeekDate).endOf('week');

  return { baseDate: startDate, startDate, endDate, mode: 'week' };
}
