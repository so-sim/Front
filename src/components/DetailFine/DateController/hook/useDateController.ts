import { FilterMode } from '@/pages/FineBook/DetailFine';
import { dateStateTest } from '@/store/dateStateTest';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilState } from 'recoil';

const useDateController = (mode: FilterMode) => {
  const [calendarDateTest, setSelectedDateTest] = useRecoilState(dateStateTest);

  const goToWeek = (week: number) => {
    const baseDate = moveDateToWeek(calendarDateTest.baseDateTest, week);
    setSelectedDateTest(baseDate);
  };

  const action = { goToWeek };

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
