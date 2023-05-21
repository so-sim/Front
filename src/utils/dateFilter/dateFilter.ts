import { DateState } from '@/store/dateState';
import { Dayjs } from 'dayjs';
import { FilterMode } from '../../pages/FineBook/DetailFine';
import { DayFilter } from './dayFilter';
import { MonthFilter } from './monthFilter';
import { DetailFilter, RootDateFilter } from './rootDateFilter';
import { WeekFilter } from './weekFilter';

// 다형성을 이용해보면 어떨까?
// 각각은 mode에 의해서 분기처리되는데
export interface DateFilterProperty {
  year?: number;
  month?: number;
  week?: number | null;
  day?: number;
  nickname?: string;
  paymentType?: string;
  page?: number;
}

const createFilter = (mode: FilterMode, week: number | null): DetailFilter => {
  switch (mode) {
    case 'day':
      return new DayFilter();
    case 'week':
      return new WeekFilter(week);
    case 'month':
      return new MonthFilter();
  }
};

// 데이터에 의해 모드를 판별하는 함수 -> decideMode
export const decideMode = ({ selectedDate, week }: DateState): FilterMode => {
  if (selectedDate !== null) return 'day';
  if (week !== null) return 'week';
  if (selectedDate === null && week === null) return 'month';
  return 'day';
};

export class DateFilter extends RootDateFilter {
  private root: DetailFilter;
  constructor(private mode: FilterMode, private week: number | null) {
    super();
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
}
