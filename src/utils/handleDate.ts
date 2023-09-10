import dayjs, { Dayjs } from 'dayjs';

const dateToFormatting = (date: Dayjs) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const addMonth = (date: Dayjs) => {
  return dayjs(date).add(1, 'month');
};

const subMonth = (date: Dayjs) => {
  return dayjs(date).subtract(1, 'month');
};

const getMonth = (date: Dayjs) => {
  return dayjs(date).month();
};

/**
 * 날짜 가져오는 함수
 * @param date baseDate
 * @returns number
 */
const getDate = (date: Dayjs) => {
  return dayjs(date).date();
};

/**
 * 요일 가져오는 함수
 * @param date baseDate
 * @returns number
 */
const getDay = (date: Dayjs) => {
  return dayjs(date).day();
};

const getDateArray = (date: Dayjs) => {
  const [year, month, day] = dayjs(date).format('YYYY-MM-DD').split('-');
  return [year, month, day];
};
export const dateToUnixTime = (date: Dayjs): number => {
  return new Date(dayjs(date).format('YYYY-MM-DD')).getTime();
};

export const handleDate = {
  dateToFormatting,
  addMonth,
  subMonth,
  getDate,
  getMonth,
  getDay,
  getDateArray,
  dateToUnixTime,
};
