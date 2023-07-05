import { DateState } from '@/store/dateState';
import { padStart } from '@/utils/padStart';
import dayjs from 'dayjs';
import { getBaseDateByChangedMode } from './DateFilter';
import { FilterModeTest } from './useDateFilter';

export class DayFilter {
  private mode: 'day' = 'day';

  getTitle = (calendarDate: DateState) => {
    const month = padStart(dayjs(calendarDate.baseDate).month() + 1);
    const day = padStart(dayjs(calendarDate.baseDate).date());

    return `${month}월 ${day}일`;
  };

  increaseDateByMode = (calendarDate: DateState) => {
    const startDate = dayjs(calendarDate.baseDate).startOf(this.mode).add(1, this.mode);

    return {
      baseDate: startDate,
      startDate: startDate,
      endDate: startDate,
      mode: this.mode,
    };
  };

  decreaseDateByMode = (calendarDate: DateState) => {
    const changedDate = dayjs(calendarDate.baseDate).subtract(1, this.mode);

    return {
      baseDate: changedDate,
      startDate: changedDate,
      endDate: changedDate,
      mode: this.mode,
    };
  };

  updateDateByButtonMode = (calendarDate: DateState, buttonMode: FilterModeTest) => {
    const startDate = getBaseDateByChangedMode(calendarDate.baseDate, buttonMode);

    return {
      baseDate: startDate,
      startDate: startDate,
      endDate: startDate,
      mode: buttonMode,
    };
  };
}
