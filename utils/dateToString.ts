import dayjs, { Dayjs } from 'dayjs';

export const dateToString = (date: Dayjs) => {
  return dayjs(date).format('YYYY-MM-DD');
};
