import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { FilterMode } from '../components/DetailFine';

export interface DateFilterProperty {
  year?: number;
  month?: number;
  week?: number | null;
  day?: number;
  userId?: number;
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

/** prev랑 base랑 month가 같으면 base로, 다르면 prev로 => 근데 그럼 그냥 prev로 해도 되지 않음? */

// /** 리턴되는 것은 prevDate | null임 */
// const updatePrevDateByWeek = (type: 'increase' | 'decrease' | 'none', mode: FilterMode, changedDate: Dayjs, prevDate: Dayjs): Dayjs | null => {
//   if (type === 'none' || mode !== 'week') return null;
//   if (changedDate.month() === prevDate.month()) return null;

//   if (prevDate.month() !== 0 && type === 'decrease') {
//     if (changedDate.month() < prevDate.month() && changedDate.endOf('week').month() === prevDate.month()) {
//       /** prev를 기준으로 달력 보여주고, week는 1로 고정시키고, based는 평소처럼 내려 */
//       return prevDate.startOf('month');
//     } else if (changedDate.month() < prevDate.month() && changedDate.endOf('week').month() !== prevDate.month()) {
//       /** base를 기준으로 그리고, preveDate = null 업데이트 시켜줘 */
//       return null;
//     }
//   } else if (prevDate.month() === 0 && type === 'decrease') {
//     if (changedDate.month() > prevDate.month() && changedDate.endOf('week').month() === prevDate.month()) {
//       /** prev를 기준으로 달력 보여주고, week는 1로 고정시키고, based는 평소처럼 내려 */
//       return prevDate.startOf('month');
//     } else if (changedDate.month() > prevDate.month() && changedDate.endOf('week').month() !== prevDate.month()) {
//       /** base를 기준으로 그리고, preveDate = null 업데이트 시켜줘 */
//       return null;
//     }
//   }

//   if (prevDate.month() !== 11 && type === 'increase') {
//     if (changedDate.month() > prevDate.month() && prevDate.endOf('week').month() !== prevDate.month()) {
//       /** 올릴 때는 비교해서 만약에 prev와 month가 다르고, prev.endOf(week).month와 prev.month()가 다르면 week = 1로 업데이트 하고, prev를 prev.endOf('week').startOf('month')로 업데이트해  */
//       return prevDate.endOf('week').startOf('month');
//     } else if (changedDate.month() > prevDate.month() && changedDate.endOf('week').month() === prevDate.month()) {
//       /** base를 기준으로 그리고, preveDate = null 업데이트 시켜줘 */
//       return null;
//     }
//   } else if (prevDate.month() === 11 && type === 'increase') {
//     if (changedDate.month() < prevDate.month() && changedDate.endOf('week').month() !== prevDate.month()) {
//       return prevDate.endOf('week').startOf('month');
//     }
//     // else if (changedDate.month() < prevDate.month() && changedDate.endOf('week').month() !== prevDate.month()) {
//     //   /** base를 기준으로 그리고, preveDate = null 업데이트 시켜줘 */
//     //   return null;
//     // }
//   }

//   return null;
// };

/**
 * 1주차일 경우 시간 보여주는거 다르게 출력해야 함
 *
 */
