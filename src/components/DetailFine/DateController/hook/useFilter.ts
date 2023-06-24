import { dateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type DuplicateMessageType = {
  [key: string]: {
    increase(baseDate: Dayjs): Dayjs;
    decrease(baseDate: Dayjs): Dayjs;
  };
};

const obj: DuplicateMessageType = {
  day: {
    increase(baseDate) {
      return dayjs();
    },
    decrease(baseDate) {
      return dayjs();
    },
  },
  week: {
    increase(baseDate: Dayjs) {
      return dayjs(baseDate).startOf('week').add(1, 'week');
    },
    decrease(baseDate: Dayjs) {
      return dayjs(baseDate).startOf('week').subtract(1, 'week');
    },
  },
  month: {
    increase(baseDate) {
      return dayjs();
    },
    decrease(baseDate) {
      return dayjs();
    },
  },
};

//baseDate도 업데이트..

// function setStarofWeek() {
//   const startDay = dayjs(baseDateTest).startOf('week');
//   const endDay = dayjs(baseDateTest).endOf('week');

//   if (startDay.month() === endDay.month()) return startDay;
//   if (startDay.date() > dayjs(baseDateTest).date()) return startDayOfMonth;
// }

const useDateController = (mode: any) => {
  const [{ baseDate }, setSelectedDateTest] = useRecoilState(dateState);

  const startDayOfMonth = dayjs(baseDate).startOf('month');

  if (mode == 'week') {
    setSelectedDateTest;
  }

  return obj[mode];
};

export default useDateController;
