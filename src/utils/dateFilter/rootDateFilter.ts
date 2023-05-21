import { FilterMode } from '@/pages/FineBook/DetailFine';
import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { DateFilterProperty } from './dateFilter';

export interface DetailFilter {
  getTitle: (baseDate: Dayjs) => string;
  update: (prev: DateFilterProperty, calendar: DateState) => DateFilterProperty;
  increaseDate: (baseDate: Dayjs) => DateState;
  decreaseDate: (baseDate: Dayjs) => DateState;
}
export class RootDateFilter implements DetailFilter {
  changeDateMode = (baseDate: Dayjs, mode: FilterMode) => {
    const changedDate: Dayjs = this.changeMode(baseDate, mode);

    return {
      baseDate: changedDate,
      week: mode === 'week' ? Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7) : null,
      selectedDate: mode === 'day' ? changedDate : null,
    };
  };

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
  protected changedDate = (changedDate: Dayjs): DateState => ({ baseDate: changedDate, selectedDate: null, week: null });
}
