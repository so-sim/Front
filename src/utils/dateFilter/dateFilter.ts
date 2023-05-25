import { DateState } from '@/store/dateState';
import { Dayjs } from 'dayjs';
import { FilterMode } from '../../pages/FineBook/DetailFine';
import { DayFilter } from './dayFilter';
import { MonthFilter } from './monthFilter';
import { RootDateFilter } from './rootDateFilter';
import { WeekFilter } from './weekFilter';

export interface DateFilterProperty {
  year?: number;
  month?: number;
  week?: number | null;
  day?: number;
  nickname?: string;
  paymentType?: string;
  page?: number;
}

export interface IDateFilter {
  getTitle: (baseDate: Dayjs) => string;
  update: (prev: DateFilterProperty, calendar: DateState) => DateFilterProperty;
  increaseDate: (baseDate: Dayjs) => DateState;
  decreaseDate: (baseDate: Dayjs) => DateState;
  updateDateStateByMode: (baseDate: Dayjs, mode: FilterMode) => DateState;
}

const createFilter = (mode: FilterMode, week: number | null): IDateFilter => {
  switch (mode) {
    case 'day':
      return new DayFilter();
    case 'week':
      return new WeekFilter(week);
    case 'month':
      return new MonthFilter();
  }
};

export class DateFilter extends RootDateFilter {
  private root: IDateFilter;
  private mode: FilterMode;
  private week: number | null;
  constructor(mode: FilterMode, week: number | null) {
    super();
    this.mode = mode;
    this.week = week;
    this.root = createFilter(this.mode, this.week);
  }

  getTitle = (baseDate: Dayjs) => {
    return this.root.getTitle(baseDate);
  };

  update = (prev: DateFilterProperty, calendar: DateState) => {
    return this.root.update(prev, calendar);
  };

  increaseDate = (baseDate: Dayjs) => {
    return this.root.increaseDate(baseDate);
  };

  decreaseDate = (baseDate: Dayjs) => {
    return this.root.decreaseDate(baseDate);
  };

  decideMode = ({ selectedDate, week }: DateState): FilterMode => {
    if (selectedDate !== null) return 'day';
    if (week !== null) return 'week';
    if (selectedDate === null && week === null) return 'month';
    return 'day';
  };
}
