import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { FilterMode } from '../../pages/FineBook/DetailFine';
import { DayFilter } from './dayFilter';
import { MonthFilter } from './monthFilter';
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

export interface DetailFilter {
  getTitle: (baseDate: Dayjs) => string;
  update: (prev: DateFilterProperty, calendar: DateState) => DateFilterProperty;
  increaseDate: (baseDate: Dayjs) => DateState;
  decreaseDate: (baseDate: Dayjs) => DateState;
  changeDateMode: (baseDate: Dayjs, newMode: FilterMode) => DateState;
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

export class DateFilter implements DetailFilter {
  private root: DetailFilter;
  constructor(private mode: FilterMode, private week: number | null) {
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

  changeDateMode = (baseDate: Dayjs, newMode: FilterMode) => {
    return this.root.changeDateMode(baseDate, newMode);
  };
}

const padStart = (number: number): string => {
  return String(number).padStart(2, '0');
};

// export class RootDateFilter implements DetailFilter {
//   protected changeMode = (baseDate: Dayjs, mode: FilterMode): Dayjs => {
//     const startDayOfMonth = dayjs(baseDate).startOf('month');

//     switch (mode) {
//       case 'month':
//         return startDayOfMonth;
//       case 'week':
//         const startDay = dayjs(baseDate).startOf('week');
//         const endDay = dayjs(baseDate).endOf('week');

//         if (startDay.month() === endDay.month()) return startDay;
//         if (startDay.date() > dayjs(baseDate).date()) return startDayOfMonth;

//         return startDay;
//       case 'day':
//         return dayjs(baseDate);
//     }
//   };

//   protected padStart = (number: number): string => {
//     return String(number).padStart(2, '0');
//   };

//   getTitle = (baseDate: Dayjs) => '';
//   update = (prev: DateFilterProperty, calendar: DateState) => ({});
//   increaseDate = (baseDate: Dayjs): DateState => ({ baseDate, selectedDate: null, week: null });
//   decreaseDate = (baseDate: Dayjs): DateState => ({ baseDate, selectedDate: null, week: null });
//   changeDateMode = (baseDate: Dayjs, newMode: FilterMode): DateState => ({ baseDate, selectedDate: null, week: null });
// }

// class DayFilter extends RootDateFilter {
//   constructor() {
//     super();
//   }

//   getTitle = (baseDate: Dayjs) => {
//     const month = this.padStart(dayjs(baseDate).month() + 1);
//     const day = this.padStart(dayjs(baseDate).date());
//     return `${month}월 ${day}일`;
//   };

//   update = ({ day, week, ...rest }: DateFilterProperty, calendar: DateState) => {
//     const [year, month, date] = dayjs(calendar.baseDate).format('YYYY.MM.DD').split('.').map(Number);

//     return { ...rest, year, month, day: date, page: 0 };
//   };

//   increaseDate = (baseDate: Dayjs) => {
//     const changedDate = this.changeMode(dayjs(baseDate).add(1, 'day'), 'day');

//     return {
//       baseDate: changedDate,
//       selectedDate: changedDate,
//       week: null,
//     };
//   };

//   decreaseDate = (baseDate: Dayjs) => {
//     const changedDate = this.changeMode(dayjs(baseDate).subtract(1, 'day'), 'day');

//     return {
//       baseDate: changedDate,
//       selectedDate: changedDate,
//       week: null,
//     };
//   };

//   changeDateMode = (baseDate: Dayjs, newMode: FilterMode) => {
//     const changedDate = this.changeMode(baseDate, newMode);
//     return {
//       baseDate: changedDate,
//       selectedDate: changedDate,
//       week: null,
//     };
//   };
// }
// class WeekFilter extends RootDateFilter {
//   constructor(private week: number | null) {
//     super();
//     this.week = week;
//   }

//   getTitle = (baseDate: Dayjs) => {
//     if (this.week === 1) {
//       const baseDateOnFirstWeek = dayjs(baseDate).startOf('week');
//       const dateToMonthOnFirstWeek = this.padStart(baseDateOnFirstWeek.month() + 1);
//       const dateToDayOnFirstWeek = this.padStart(baseDateOnFirstWeek.date());

//       const lastDay = dayjs(baseDateOnFirstWeek).add(6, 'day');
//       const lastDayToMonth = this.padStart(dayjs(lastDay).month() + 1);
//       const lastDayToDay = this.padStart(dayjs(lastDay).date());

//       return `${dateToMonthOnFirstWeek}월 ${dateToDayOnFirstWeek}일 - ${lastDayToMonth}월 ${lastDayToDay}일`;
//     }

//     const month = this.padStart(dayjs(baseDate).month() + 1);
//     const day = this.padStart(dayjs(baseDate).date());

//     const lastDay = dayjs(baseDate).add(6, 'day');
//     const lastDayToMonth = this.padStart(dayjs(lastDay).month() + 1);
//     const lastDayToDay = this.padStart(dayjs(lastDay).date());
//     return `${month}월 ${day}일 - ${lastDayToMonth}월 ${lastDayToDay}일`;
//   };

//   update = ({ day, week, ...rest }: DateFilterProperty, calendar: DateState) => {
//     const [year, month, date] = dayjs(calendar.baseDate).format('YYYY.MM.DD').split('.').map(Number);

//     return { ...rest, year, month, week: calendar.week, page: 0 };
//   };

//   increaseDate = (baseDate: Dayjs) => {
//     const changedDate = this.changeMode(dayjs(baseDate).startOf('week').add(1, 'week'), 'week');

//     return {
//       baseDate: changedDate,
//       week: Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7),
//       selectedDate: null,
//     };
//   };

//   decreaseDate = (baseDate: Dayjs) => {
//     const changedDate = this.changeMode(dayjs(baseDate).startOf('week').subtract(1, 'week'), 'week');

//     return {
//       baseDate: changedDate,
//       week: Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7),
//       selectedDate: null,
//     };
//   };

//   changeDateMode = (baseDate: Dayjs, newMode: FilterMode) => {
//     const changedDate = this.changeMode(baseDate, newMode);
//     return {
//       baseDate: changedDate,
//       week: Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7),
//       selectedDate: null,
//     };
//   };
// }
// class MonthFilter extends RootDateFilter {
//   constructor() {
//     super();
//   }

//   getTitle = (baseDate: Dayjs) => {
//     const month = this.padStart(dayjs(baseDate).month() + 1);
//     return `${month}월`;
//   };

//   update = ({ day, week, ...rest }: DateFilterProperty, calendar: DateState) => {
//     const [year, month, date] = dayjs(calendar.baseDate).format('YYYY.MM.DD').split('.').map(Number);

//     return { ...rest, year, month, page: 0 };
//   };

//   increaseDate = (baseDate: Dayjs) => {
//     const changedDate = this.changeMode(dayjs(baseDate).add(1, 'month'), 'month');

//     return {
//       baseDate: changedDate,
//       week: null,
//       selectedDate: null,
//     };
//   };

//   decreaseDate = (baseDate: Dayjs) => {
//     const changedDate = this.changeMode(dayjs(baseDate).subtract(1, 'month'), 'month');

//     return {
//       baseDate: changedDate,
//       week: null,
//       selectedDate: null,
//     };
//   };

//   changeDateMode = (baseDate: Dayjs, newMode: FilterMode) => {
//     const changedDate = this.changeMode(baseDate, newMode);

//     return {
//       baseDate: changedDate,
//       week: null,
//       selectedDate: null,
//     };
//   };
// }

//

//title을 얻는 함수 -> getTitle
export const dateFilterTitle = (baseDate: Dayjs, mode: FilterMode, week: number | null): string => {
  const month = padStart(dayjs(baseDate).month() + 1);
  const day = padStart(dayjs(baseDate).date());

  switch (mode) {
    case 'day':
      return `${month}월 ${day}일`;
    case 'week':
      if (week === 1) {
        const baseDateOnFirstWeek = dayjs(baseDate).startOf('week');
        const dateToMonthOnFirstWeek = padStart(baseDateOnFirstWeek.month() + 1);
        const dateToDayOnFirstWeek = padStart(baseDateOnFirstWeek.date());

        const lastDay = dayjs(baseDateOnFirstWeek).add(6, 'day');
        const lastDayToMonth = padStart(dayjs(lastDay).month() + 1);
        const lastDayToDay = padStart(dayjs(lastDay).date());

        return `${dateToMonthOnFirstWeek}월 ${dateToDayOnFirstWeek}일 - ${lastDayToMonth}월 ${lastDayToDay}일`;
      }

      const lastDay = dayjs(baseDate).add(6, 'day');

      const lastDayToMonth = padStart(dayjs(lastDay).month() + 1);
      const lastDayToDay = padStart(dayjs(lastDay).date());
      return `${month}월 ${day}일 - ${lastDayToMonth}월 ${lastDayToDay}일`;
    case 'month':
      return `${month}월`;
  }
};

// 모드가 바뀔 때 필터를 업데이트 하는 함수(날짜가 바뀌어도 사라지면 안 되는 필터가 존재하기 때문) -> update
export const updateDateFilterByMode = (mode: FilterMode, prev: DateFilterProperty, dateState: DateState) => {
  const [year, month, date] = dayjs(dateState.baseDate).format('YYYY.MM.DD').split('.').map(Number);

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

// 데이터에 의해 모드를 판별하는 함수 -> decideMode
export const dateFilterMode = ({ selectedDate, week }: DateState): FilterMode => {
  if (selectedDate !== null) return 'day';
  if (week !== null) return 'week';
  if (selectedDate === null && week === null) return 'month';
  return 'day';
};

// increase
// decrease
// changeMode

// 모드에 의해 date를 변경하고 업데이트된 값을 기존 값에 덮어 씌우는 함수 (날짜가 바뀌어도 사라지면 안 되는 필터가 존재하기 때문)
export const updateCalendarByType = (type: 'increase' | 'decrease' | 'none', baseDate: Dayjs, mode: FilterMode) => {
  let changedDate: Dayjs;

  if (type === 'increase') {
    changedDate = increaseDateByMode(baseDate, mode);
  } else if (type === 'decrease') {
    changedDate = decreaseDateByMode(baseDate, mode);
  } else {
    changedDate = changeMode(baseDate, mode);
  }

  return {
    baseDate: changedDate,
    week: mode === 'week' ? Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7) : null,
    selectedDate: mode === 'day' ? changedDate : null,
  };
};

// {baseDate, week} : DataState, mode
// 이 전 dateFilterProperty : 왜냐하면 업데이트 시 그대로 나머지도 유지되어야 하기 때문

/**
 * 내부 로직
 */
// 모드에 의해 date를 증가시키는 함수
const increaseDateByMode = (baseDate: Dayjs, mode: FilterMode): Dayjs => {
  return mode === 'week' ? dayjs(baseDate).startOf('week').add(1, mode) : dayjs(baseDate).add(1, mode);
};

// 모드에 의해 date를 감소시키는 함수
const decreaseDateByMode = (baseDate: Dayjs, mode: FilterMode): Dayjs => {
  return changeMode(mode === 'week' ? dayjs(baseDate).endOf('week').subtract(1, mode) : dayjs(baseDate).subtract(1, mode), mode);
};

// 모드를 바꿀 때 baseDate를 맞춰주는 함수
const changeMode = (baseDate: Dayjs, mode: FilterMode): Dayjs => {
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
