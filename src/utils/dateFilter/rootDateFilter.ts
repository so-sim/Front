import { FilterMode } from '@/pages/FineBook/DetailFine';
import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { DateFilterProperty, DetailFilter } from './dateFilter';

export class RootDateFilter implements DetailFilter {
  protected changeMode = (baseDate: Dayjs, mode: FilterMode): Dayjs => {
    const startDayOfMonth = dayjs(baseDate).startOf('month');

    switch (mode) {
      case 'month':
        return startDayOfMonth;
      case 'week':
        const startDay = dayjs(baseDate).startOf('week');
        const endDay = dayjs(baseDate).endOf('week');

        if (startDay.month() === endDay.month()) return startDay;
        if (startDay.date() > dayjs(baseDate).date()) return startDayOfMonth;

        return startDay;
      case 'day':
        return dayjs(baseDate);
    }
  };

  protected padStart = (number: number): string => {
    return String(number).padStart(2, '0');
  };

  getTitle = (baseDate: Dayjs) => '';
  update = (prev: DateFilterProperty, calendar: DateState) => ({});
  increaseDate = (baseDate: Dayjs): DateState => ({ baseDate, selectedDate: null, week: null });
  decreaseDate = (baseDate: Dayjs): DateState => ({ baseDate, selectedDate: null, week: null });
  changeDateMode = (baseDate: Dayjs, newMode: FilterMode): DateState => ({ baseDate, selectedDate: null, week: null });
}
