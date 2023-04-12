import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { FilterMode } from '../components/DetailFine';

export interface DateFilterProperty {
  year?: number;
  month?: number;
  week?: number | null;
  day?: number;
  nickname?: string;
  paymentType?: string;
  page?: number;
}

export const dateFilterToQuery = (dateFilterProperty: Partial<DateFilterProperty>): string => {
  const queries = Object.entries(dateFilterProperty)
    .filter((property) => property[1] !== null && property[1] !== '')
    .reduce((prev, curr) => `${prev}&${curr[0]}=${curr[1]}`, '')
    .slice(1);

  return queries;
};

export const dateFilterTitle = (baseDate: Dayjs, mode: FilterMode, week: number | null): string => {
  const changedbaseDateToMonth = Number(dayjs(baseDate).month() + 1);
  const changedbaseDateToDay = Number(dayjs(baseDate).date());

  const month = prependZeroBelowTen(changedbaseDateToMonth);
  const day = prependZeroBelowTen(changedbaseDateToDay);

  switch (mode) {
    case 'day':
      return `${month}월 ${day}일`;
    case 'week':
      // if (week === null) throw new Error('mode가 week일 때 week는 null일 수 없습니다.');

      if (week === 1) {
        const baseDateOnFirstWeek = dayjs(baseDate).startOf('week');
        const dateToMonthOnFirstWeek = prependZeroBelowTen(baseDateOnFirstWeek.month() + 1);
        const dateToDayOnFirstWeek = prependZeroBelowTen(baseDateOnFirstWeek.date());

        const lastDay = dayjs(baseDateOnFirstWeek).add(6, 'day');
        const lastDayToMonth = prependZeroBelowTen(dayjs(lastDay).month() + 1);
        const lastDayToDay = prependZeroBelowTen(dayjs(lastDay).date());

        return `${dateToMonthOnFirstWeek}월 ${dateToDayOnFirstWeek}일 - ${lastDayToMonth}월 ${lastDayToDay}일`;
      }

      const lastDay = dayjs(baseDate).add(6, 'day');

      const lastDayToMonth = prependZeroBelowTen(dayjs(lastDay).month() + 1);
      const lastDayToDay = prependZeroBelowTen(dayjs(lastDay).date());
      return `${month}월 ${day}일 - ${lastDayToMonth}월 ${lastDayToDay}일`;
    default:
      return `${month}월`;
  }
};

export const prependZeroBelowTen = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const updateCalendarByType = (type: 'increase' | 'decrease' | 'none', prev: DateState, mode: FilterMode) => {
  const changedDate = changeDateByType(type, prev.baseDate, mode);

  return {
    ...prev,
    baseDate: changedDate,
    week: mode === 'week' ? Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7) : null,
    selectedDate: mode === 'day' ? changedDate : null,
  };
};

export const dateFilterMode = (dataState: DateState): FilterMode => {
  if (dataState.selectedDate !== null) return 'day';
  if (dataState.week !== null) return 'week';
  if (dataState.selectedDate === null && dataState.week === null) return 'month';
  return 'day';
};

export const updateDateFilterByMode = (mode: FilterMode, prev: DateFilterProperty, dateState: DateState) => {
  const [year, month, date] = dayjs(dateState.baseDate)
    .format('YYYY.MM.DD')
    .split('.')
    .map((property) => Number(property));

  const { day, week, ...rest } = prev;
  switch (mode) {
    case 'week':
      return { ...rest, year, month, week: dateState.week, page: 0 };
    case 'day':
      return { ...rest, year, month, day: date, page: 0 };
    case 'month':
      return { ...rest, year, month, page: 0 };
    default:
      return prev;
  }
};

const changeDateByType = (type: 'increase' | 'decrease' | 'none', baseDate: Dayjs, mode: FilterMode): Dayjs => {
  if (type === 'increase') {
    return mode === 'week' ? dayjs(baseDate).startOf('week').add(1, mode) : dayjs(baseDate).add(1, mode);
  }
  if (type === 'decrease') {
    return mode === 'week' ? dayjs(baseDate).endOf('week').subtract(1, mode) : dayjs(baseDate).subtract(1, mode);
  }

  switch (mode) {
    case 'month':
      return dayjs(baseDate).startOf('month');
    case 'week':
      if (dayjs(baseDate).startOf('week').month() !== dayjs(baseDate).endOf('week').month()) {
        return dayjs(baseDate);
      }
      return dayjs(baseDate).startOf('week');
    default:
      return dayjs(baseDate);
  }
};
