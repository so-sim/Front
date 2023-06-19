import { dateStateTest } from '@/store/dateStateTest';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';

const useDateController = () => {
  const [calendarDateTest, setSelectedDateTest] = useRecoilState(dateStateTest);

  const weekToDate = (week: number) => {
    const startOfMonthDay = dayjs(calendarDateTest.baseDateTest).set('date', 1).startOf('month').day();
    const startOfWeekDate = (week - 1) * 7 + 1 - startOfMonthDay;

    return startOfWeekDate;
  };

  const action = { weekToDate };

  return action;
};

export default useDateController;
