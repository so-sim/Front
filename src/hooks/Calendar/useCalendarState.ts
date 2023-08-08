import { dateState } from '@/store/dateState';
import createCalendar from '@/utils/createCalendar';
import { handleDate } from '@/utils/handleDate';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type CreateCalendarHook = {
  calendarDate: dayjs.Dayjs;
  setCalendarDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  increaseMonth: () => void;
  decreaseMonth: () => void;
};

const useCalendarState = (): CreateCalendarHook => {
  const { addMonth, subMonth } = handleDate;

  const [{ baseDate, startDate, endDate, mode }, setDateTestObj] = useRecoilState(dateState);

  const [calendarDate, setCalendarDate] = useState(baseDate);

  const increaseMonth = () => {
    setCalendarDate(addMonth(calendarDate));
  };
  const decreaseMonth = () => {
    setCalendarDate(subMonth(calendarDate));
  };

  return {
    calendarDate,
    setCalendarDate,
    increaseMonth,
    decreaseMonth,
  };
};

export default useCalendarState;
