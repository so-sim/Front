import { FilterMode } from '@/pages/FineBook/DetailFine';
import { dateState, DateState } from '@/store/dateState';
import { weekList } from '@/utils/customedWeek';
import { padStart } from '@/utils/padStart';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilState } from 'recoil';

type FilterModeTest = FilterMode;

const createFilter = (mode: FilterModeTest) => {
  switch (mode) {
    case 'day':
      return new DayFilter();
    case 'week':
      return new WeekFilter();
    case 'month':
      return new MonthFilter();
  }
};

export const useDateFilter = () => {
  const [calendarDate, setCalendarDate] = useRecoilState(dateState);

  const dateFilter = createFilter(calendarDate.mode);

  const goToWeek = (weekText: string) => {
    const week = weekList.indexOf(weekText) + 1;
    const baseDate = moveDateToWeek(calendarDate.baseDate, week);
    setCalendarDate(baseDate);
  };

  const increaseDate = () => {
    const changedDateState = dateFilter.increaseDateByMode(calendarDate.baseDate);
    setCalendarDate(changedDateState);
  };

  const decreaseDate = () => {
    const changedDateState = dateFilter.decreaseDateByMode(calendarDate.baseDate);
    setCalendarDate(changedDateState);
  };

  const getTitle = () => {
    const dateTitle = dateFilter.getTitle(calendarDate);
    return dateTitle;
  };

  const changeDateByButtonMode = (buttonMode: FilterModeTest) => {
    const changedDateState = dateFilter.updateDateByButtonMode(calendarDate.baseDate, buttonMode);
    setCalendarDate(changedDateState);
  };

  return { increaseDate, decreaseDate, getTitle, changeDateByButtonMode, goToWeek };
};

class WeekFilter {
  private mode: FilterMode = 'week';

  getTitle = (calendarDate: DateState) => {
    const startMonth = padStart(dayjs(calendarDate.startDate).month() + 1);
    const startDate = padStart(dayjs(calendarDate.startDate).date());
    const endMonth = padStart(dayjs(calendarDate.endDate).month() + 1);
    const endDate = padStart(dayjs(calendarDate.endDate).date());

    return `${startMonth}월 ${startDate}일 - ${endMonth}월 ${endDate}일`;
  };

  increaseDateByMode = (baseDate: Dayjs) => {
    const startDate = dayjs(baseDate).startOf(this.mode).add(1, this.mode);

    return {
      baseDate: startDate,
      startDate: startDate,
      endDate: startDate.endOf(this.mode),
      mode: this.mode,
    };
  };

  decreaseDateByMode = (baseDate: Dayjs) => {
    const startDayOfMonth = dayjs(baseDate).startOf('month');
    const startDay = dayjs(baseDate).startOf('week');
    const changedStartDate = startDay.date() > dayjs(baseDate).date() ? startDayOfMonth : startDay;
    const changedDate = changedStartDate.subtract(1, this.mode);

    return {
      baseDate: changedDate,
      startDate: changedDate.startOf(this.mode),
      endDate: changedDate.endOf(this.mode),
      mode: this.mode,
    };
  };

  updateDateByButtonMode = (baseDate: Dayjs, buttonMode: FilterMode) => {
    const startDate = this.getBaseDateByChangedMode(baseDate, buttonMode);

    return {
      baseDate: startDate,
      startDate: startDate.startOf(buttonMode),
      endDate: startDate.endOf(buttonMode),
      mode: buttonMode,
    };
  };

  getBaseDateByChangedMode = (baseDate: Dayjs, mode: FilterMode) => {
    const startDayOfMonth = dayjs(baseDate).startOf('month');
    const startDay = dayjs(baseDate).startOf('week');
    const endDay = dayjs(baseDate).endOf('week');

    if (startDay.month() === endDay.month()) return startDay;
    if (startDay.date() > dayjs(baseDate).date()) return startDayOfMonth;

    return startDay;
  };
}

class DayFilter {
  private mode: FilterMode = 'day';

  getTitle = (calendarDate: DateState) => {
    const month = padStart(dayjs(calendarDate.baseDate).month() + 1);
    const day = padStart(dayjs(calendarDate.baseDate).date());

    return `${month}월 ${day}일`;
  };

  increaseDateByMode = (baseDate: Dayjs) => {
    const startDate = dayjs(baseDate).startOf(this.mode).add(1, this.mode);

    return {
      baseDate: startDate,
      startDate: startDate,
      endDate: startDate,
      mode: this.mode,
    };
  };

  decreaseDateByMode = (baseDate: Dayjs) => {
    const changedDate = dayjs(baseDate).subtract(1, this.mode);

    return {
      baseDate: changedDate,
      startDate: changedDate,
      endDate: changedDate,
      mode: this.mode,
    };
  };

  updateDateByButtonMode = (baseDate: Dayjs, buttonMode: FilterMode) => {
    const startDate = this.getBaseDateByChangedMode(baseDate, buttonMode);

    return {
      baseDate: startDate,
      startDate: startDate,
      endDate: startDate,
      mode: buttonMode,
    };
  };

  getBaseDateByChangedMode = (baseDate: Dayjs, mode: FilterMode) => {
    return dayjs(baseDate);
  };
}

class MonthFilter {
  private mode: FilterMode = 'month';

  getTitle = (calendarDate: DateState) => {
    const month = padStart(dayjs(calendarDate.baseDate).month() + 1);
    return `${month}월`;
  };

  increaseDateByMode = (baseDate: Dayjs) => {
    const startDate = dayjs(baseDate).startOf(this.mode).add(1, this.mode);

    return {
      baseDate: startDate,
      startDate: startDate,
      endDate: startDate.endOf(this.mode),
      mode: this.mode,
    };
  };

  decreaseDateByMode = (baseDate: Dayjs) => {
    const startDayOfMonth = dayjs(baseDate).startOf(this.mode).subtract(1, this.mode);
    return {
      baseDate: startDayOfMonth,
      startDate: startDayOfMonth.startOf(this.mode),
      endDate: startDayOfMonth.endOf(this.mode),
      mode: this.mode,
    };
  };

  updateDateByButtonMode = (baseDate: Dayjs, buttonMode: FilterMode) => {
    const startDate = this.getBaseDateByChangedMode(baseDate, buttonMode);

    return {
      baseDate: startDate,
      startDate: startDate.startOf(buttonMode),
      endDate: startDate.endOf(buttonMode),
      mode: buttonMode,
    };
  };

  getBaseDateByChangedMode = (baseDate: Dayjs, mode: FilterMode) => {
    const startDayOfMonth = dayjs(baseDate).startOf(mode);
    return startDayOfMonth;
  };
}

export function moveDateToWeek(baseDate: Dayjs, week: number): DateState {
  const startOfMonthDay = dayjs(baseDate).set('date', 1).startOf('month').day();
  // 해당 달의 시작하는 요일을 찾는 것.
  // day가 요일 date가 날짜.
  const startOfWeekDate = (week - 1) * 7 + 1 - startOfMonthDay;
  // 선택된 week에 시작하는 날짜를 알아낼 수 있음.  (은근 날짜에 이쁜 패턴이 많다)
  if (week === 1) {
    const startDateOfMonth = dayjs(baseDate).startOf('month');
    return {
      baseDate: startDateOfMonth, //
      startDate: startDateOfMonth.startOf('week'),
      endDate: startDateOfMonth.endOf('week'),
      mode: 'week' as FilterMode,
    };
  }

  const startDate = dayjs(baseDate).set('date', startOfWeekDate);
  const endDate = dayjs(baseDate).set('date', startOfWeekDate).endOf('week');

  return { baseDate: startDate, startDate, endDate, mode: 'week' };
}
