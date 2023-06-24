import { FilterMode } from '@/pages/FineBook/DetailFine';
import { DateState, dateState } from '@/store/dateState';
import { padStart } from '@/utils/padStart';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilState } from 'recoil';

const useDateController = (mode: FilterMode) => {
  const [calendarDate, setSelectedDate] = useRecoilState(dateState);

  const goToWeek = (week: string) => {
    const numberWeek = Number(week[0]);
    const baseDate = moveDateToWeek(calendarDate.baseDate, numberWeek);
    setSelectedDate(baseDate);
  };

  const changeDateByButtonMode = (buttonMode: FilterMode) => {
    const baseDate = updateDateByButtonMode(calendarDate.baseDate, buttonMode);
    setSelectedDate(baseDate);
  };

  const getTitle = () => {
    return getTitleByMode(calendarDate, mode);
  };

  const increase = () => {
    const baseDate = increaseDateByMode(calendarDate.baseDate, mode);
    setSelectedDate(baseDate);
  };

  const decrease = () => {
    const baseDate = decreaseDateByMode(calendarDate.baseDate, mode);
    setSelectedDate(baseDate);
  };

  const action = { goToWeek, changeDateByButtonMode, getTitle, increase, decrease };

  return action;
};

export default useDateController;

export function moveDateToWeek(baseDate: Dayjs, week: number) {
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

  return { baseDate: startDate, startDate, endDate, mode: 'week' as FilterMode };
}

export function updateDateByButtonMode(baseDate: Dayjs, buttonMode: FilterMode) {
  const startDate = getBaseDateByChangedMode(baseDate, buttonMode);

  return {
    baseDate: startDate,
    startDate: startDate.startOf(buttonMode),
    endDate: startDate.endOf(buttonMode),
    mode: buttonMode,
  };
}

function getBaseDateByChangedMode(baseDate: Dayjs, mode: FilterMode) {
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
}

type ModeTilerType = {
  [key: string]: Dayjs;
};

export function increaseDateByMode(baseDate: Dayjs, mode: FilterMode) {
  const startDayOfMonth = dayjs(baseDate).startOf('month');
  const startDay = dayjs(baseDate).startOf('week');

  const modeFilterObj: ModeTilerType = {
    month: startDayOfMonth,
    week: startDay.date() > dayjs(baseDate).date() ? startDayOfMonth : startDay,
    day: dayjs(baseDate),
  };
  // 현재 이 부분을 어떻게 가져다 쓸지...
  // 지금 현재 startDate endDate기반이 세워져있으니, 굳이 뺴야하나??  그냥 setDate prev.add(1,mode) 만 해줘도 될 것 같다.

  return {
    baseDate: modeFilterObj[mode].add(1, mode),
    startDate: modeFilterObj[mode].add(1, mode).startOf(mode),
    endDate: modeFilterObj[mode].add(1, mode).endOf(mode),
    mode,
  };
}

export function decreaseDateByMode(baseDate: Dayjs, mode: FilterMode) {
  const startDayOfMonth = dayjs(baseDate).startOf('month');
  const startDay = dayjs(baseDate).startOf('week');

  const modeFilterObj: ModeTilerType = {
    month: startDayOfMonth,
    week: startDay.date() > dayjs(baseDate).date() ? startDayOfMonth : startDay,
    day: dayjs(baseDate),
  };

  return {
    baseDate: modeFilterObj[mode].subtract(1, mode),
    startDate: modeFilterObj[mode].subtract(1, mode).startOf(mode),
    endDate: modeFilterObj[mode].subtract(1, mode).endOf(mode),
    mode,
  };
}

export function getTitleByMode(calendarDate: DateState, mode: FilterMode) {
  const month = padStart(dayjs(calendarDate.baseDate).month() + 1);

  switch (mode) {
    case 'month':
      return `${month}월`;
    case 'week':
      const startMonth = padStart(dayjs(calendarDate.startDate).month() + 1);
      const startDate = padStart(dayjs(calendarDate.startDate).date());
      const endMonth = padStart(dayjs(calendarDate.endDate).month() + 1);
      const endDate = padStart(dayjs(calendarDate.endDate).date());

      return `${startMonth}월 ${startDate}일 - ${endMonth}월 ${endDate}일`;
    default:
      const day = padStart(dayjs(calendarDate.baseDate).date());

      return `${month}월 ${day}일`;
  }
}
