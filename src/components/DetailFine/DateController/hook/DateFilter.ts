import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { CustomFilter } from './CustomFilter';
import { DayFilter } from './DayFilter';
import { MonthFilter } from './MonthFilter';
import { FilterModeTest } from './useDateFilter';
import { WeekFilter } from './WeekFilter';

const createFilter = (mode: FilterModeTest) => {
  switch (mode) {
    case 'day':
      return new DayFilter();
    case 'week':
      return new WeekFilter();
    case 'month':
      return new MonthFilter();
    case 'custom':
      return new CustomFilter();
  }
};

export interface IDateFilter {
  increaseDateByMode: (calendarDate: DateState) => DateState;
  decreaseDateByMode: (calendarDate: DateState) => DateState;
  updateDateByButtonMode: (calendarDate: DateState, buttonMode: FilterModeTest) => DateState;
  getTitle: (calendarDate: DateState) => string;
}

export class DateFilter implements IDateFilter {
  private root;

  constructor(mode: FilterModeTest) {
    this.root = createFilter(mode);
  }

  increaseDateByMode = (calendarDate: DateState) => {
    return this.root.increaseDateByMode(calendarDate);
  };

  decreaseDateByMode = (calendarDate: DateState) => {
    return this.root.decreaseDateByMode(calendarDate);
  };

  updateDateByButtonMode = (calendarDate: DateState, buttonMode: FilterModeTest) => {
    if (buttonMode === 'custom') return calendarDate;

    const startDate = getBaseDateByChangedMode(calendarDate.baseDate, buttonMode);
    return {
      baseDate: startDate,
      startDate: startDate.startOf(buttonMode),
      endDate: startDate.endOf(buttonMode),
      mode: buttonMode,
    };
  };

  getTitle = (calendarDate: DateState) => {
    return this.root.getTitle(calendarDate);
  };
}

export const getBaseDateByChangedMode = (baseDate: Dayjs, mode: FilterModeTest): Dayjs => {
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
    case 'custom':
      return dayjs(baseDate);
  }
};
