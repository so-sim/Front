import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { DateFilterProperty } from './dateFilter';
import { RootDateFilter } from './rootDateFilter';

export class DayFilter extends RootDateFilter {
  constructor() {
    super();
  }

  getTitle = (baseDate: Dayjs) => {
    const month = this.padStart(dayjs(baseDate).month() + 1);
    const day = this.padStart(dayjs(baseDate).date());
    return `${month}월 ${day}일`;
  };

  update = ({ day, week, ...rest }: DateFilterProperty, calendar: DateState) => {
    const [year, month, date] = dayjs(calendar.baseDate).format('YYYY.MM.DD').split('.').map(Number);
    return { ...rest, year, month, day: date, page: 0 };
  };

  increaseDate = (baseDate: Dayjs) => {
    const changedDate = this.setStartDayByMode(dayjs(baseDate).add(1, 'day'), 'day');
    return this.getChangedDateState(changedDate);
  };

  decreaseDate = (baseDate: Dayjs) => {
    const changedDate = this.setStartDayByMode(dayjs(baseDate).subtract(1, 'day'), 'day');
    return this.getChangedDateState(changedDate);
  };

  protected getChangedDateState = (changedDate: Dayjs): DateState => ({
    baseDate: changedDate,
    selectedDate: changedDate,
    week: null,
  });
}
