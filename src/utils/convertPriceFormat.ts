import { LIMIT_PAYMENT } from '@/constants/Payment';

export const convertFromPriceFormat = (payment: string) => {
  let paymentWithoutComma = Number(payment.replaceAll(',', ''));

  if (paymentWithoutComma > LIMIT_PAYMENT) paymentWithoutComma = LIMIT_PAYMENT;
  return paymentWithoutComma;
};

export const convertToPriceFormat = (value: number): string => {
  const format = new Intl.NumberFormat('ko-KR').format(value);
  return format === '0' ? '' : format;
};
