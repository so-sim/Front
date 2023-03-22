import { Dayjs } from 'dayjs';

export const dateToString = (date: Dayjs) => {
  return date.format('YYYY-MM-DD');
};
