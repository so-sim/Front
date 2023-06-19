import { FilterMode } from '@/pages/FineBook/DetailFine';
import { DateStateTest, dateStateTest } from '@/store/dateStateTest';
import { padStart } from '@/utils/padStart';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilState } from 'recoil';

const useDateController = (mode: FilterMode) => {
  const [calendarDateTest, setSelectedDateTest] = useRecoilState(dateStateTest);

  const goToWeek = (week: number) => {
    const baseDate = moveDateToWeek(calendarDateTest.baseDateTest, week);
    setSelectedDateTest(baseDate);
  };

  const changeDateByButtonMode = (buttonMode: FilterMode) => {
    const baseDate = updateDateByButtonMode(calendarDateTest.baseDateTest, buttonMode);
    setSelectedDateTest(baseDate);
  };

  const getTitle = () => {
    return getTitleByMode(calendarDateTest, mode);
  };

  const action = { goToWeek, changeDateByButtonMode, getTitle };

  return action;
};

export default useDateController;

export function moveDateToWeek(baseDate: Dayjs, week: number) {
  const startOfMonthDay = dayjs(baseDate).set('date', 1).startOf('month').day();
  const startOfWeekDate = (week - 1) * 7 + 1 - startOfMonthDay;

  if (week === 1) {
    const startDateOfMonth = dayjs(baseDate).startOf('month');

    return {
      baseDateTest: startDateOfMonth, //
      startDate: startDateOfMonth.startOf('week'),
      endDate: startDateOfMonth.endOf('week'),
    };
  }

  const startDate = dayjs(baseDate).set('date', startOfWeekDate);
  const endDate = dayjs(baseDate).set('date', startOfWeekDate).endOf('week');

  return { baseDateTest: startDate, startDate, endDate };
}

export function updateDateByButtonMode(baseDate: Dayjs, buttonMode: FilterMode) {
  const startDate = getBaseDateByChangedMode(baseDate, buttonMode);

  return {
    baseDateTest: startDate,
    startDate: startDate.startOf(buttonMode),
    endDate: startDate.endOf(buttonMode),
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

export function getTitleByMode(calendarDate: DateStateTest, mode: FilterMode) {
  const month = padStart(dayjs(calendarDate.baseDateTest).month() + 1);

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
      const day = padStart(dayjs(calendarDate.baseDateTest).date());

      return `${month}월 ${day}일`;
  }
}
