import { DateState } from '@/store/dateState';
import { Dayjs } from 'dayjs';
import { FilterMode } from '../../pages/FineBook/DetailFine';
import { DayFilter } from './dayFilter';
import { MonthFilter } from './monthFilter';
import { RootDateFilter } from './rootDateFilter';
import { WeekFilter } from './weekFilter';

export interface DetailFilter {
  year?: number;
  month?: number;
  week?: number | null;
  day?: number;
  nickname?: string;
  paymentType?: string;
  page: number;
}

// export interface IDateFilter {
//   getTitle: (baseDate: Dayjs) => string;
//   update: (prev: DetailFilter, calendar: DateState) => DetailFilter;
//   increaseDate: (baseDate: Dayjs) => DateState;
//   decreaseDate: (baseDate: Dayjs) => DateState;
//   updateDateStateByMode: (baseDate: Dayjs, mode: FilterMode) => DateState;
// }

// const createFilter = (mode: FilterMode, week: number | null): IDateFilter => {
//   switch (
//     mode
//     // case 'day':
//     //   return new DayFilter();
//     // case 'week':
//     //   return new WeekFilter(week);
//     // case 'month':
//     //   return new MonthFilter();
//     // 임시 주석
//   ) {
//   }
// };

// export class DateFilter extends RootDateFilter {
//   private root: IDateFilter;
//   private mode: FilterMode;
//   private week: number | null;
//   constructor(mode: FilterMode, week: number | null) {
//     super();
//     this.mode = mode;
//     this.week = week;
//     this.root = createFilter(this.mode, this.week);
//   }

//   getTitle = (baseDate: Dayjs) => {
//     return this.root.getTitle(baseDate);
//   };

//   update = (prev: DetailFilter, calendar: DateState) => {
//     return this.root.update(prev, calendar);
//   };

//   increaseDate = (baseDate: Dayjs) => {
//     return this.root.increaseDate(baseDate);
//   };

//   decreaseDate = (baseDate: Dayjs) => {
//     return this.root.decreaseDate(baseDate);
//   };

//   decideMode = ({ mode }: DateState): FilterMode => {
//     return mode;
//   };
// }
