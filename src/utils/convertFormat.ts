import { padStart } from './padStart';

export const convertFromPriceFormat = (payment: string) => {
  let paymentWithoutComma = Number(payment.replaceAll(',', ''));

  return paymentWithoutComma;
};

export const convertToPriceFormat = (value: number): string => {
  const format = new Intl.NumberFormat('ko-KR').format(value);
  return format === '0' ? '' : format;
};

/**
 * 숫자 두개마다 .이 자동완성 되어야 함
 * @param date: string 230704 형태
 */
export const convertDateFormat = (date: string) => {
  let result = '';

  for (let i = 0; i < date.length; i++) {
    if (i === 4 || i === 6) result += '-';
    result += date[i];
  }
  return result;
};

export const convertTimeFormat = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  if (hour === 0) return `오전 12:${padStart(minute)}`;

  let result = '';
  result += hour >= 12 ? '오후 ' : '오전 ';
  result += hour >= 13 ? `${padStart(hour - 12)}:${padStart(minute)}` : `${padStart(hour)}:${padStart(minute)}`;

  return result;
};

export const covertToTime = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  if (hour === 0) return minute === 0 ? `오전 12시` : `오전 12시 ${minute}분`;

  let result = '';
  result += hour >= 12 ? '오후 ' : '오전 ';
  const hourForView = hour >= 13 ? hour - 12 : hour;

  return minute === 0 ? `${result} ${hourForView}시` : `${result} ${hourForView}시 ${minute}분`;
};

export const covertDateForView = (date: string) => {
  return date.replaceAll('-', '.');
};
