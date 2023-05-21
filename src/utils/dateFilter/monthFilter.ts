import { FilterMode } from '@/pages/FineBook/DetailFine';
import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { DateFilterProperty } from './dateFilter';
import { RootDateFilter } from './rootDateFilter';

export class MonthFilter extends RootDateFilter {
  constructor() {
    super();
  }

  getTitle = (baseDate: Dayjs) => {
    const month = this.padStart(dayjs(baseDate).month() + 1);
    return `${month}월`;
  };

  update = ({ day, week, ...rest }: DateFilterProperty, calendar: DateState) => {
    const [year, month, date] = dayjs(calendar.baseDate).format('YYYY.MM.DD').split('.').map(Number);

    return { ...rest, year, month, page: 0 };
  };

  increaseDate = (baseDate: Dayjs) => {
    const changedDate = this.changeMode(dayjs(baseDate).add(1, 'month'), 'month');

    return {
      baseDate: changedDate,
      week: null,
      selectedDate: null,
    };
  };

  decreaseDate = (baseDate: Dayjs) => {
    const changedDate = this.changeMode(dayjs(baseDate).subtract(1, 'month'), 'month');

    return {
      baseDate: changedDate,
      week: null,
      selectedDate: null,
    };
  };

  changeDateMode = (baseDate: Dayjs, newMode: FilterMode) => {
    const changedDate = this.changeMode(baseDate, newMode);

    return {
      baseDate: changedDate,
      week: null,
      selectedDate: null,
    };
  };
}
