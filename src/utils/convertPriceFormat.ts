export const convertFromPriceFormat = (payment: string) => {
  let paymentWithoutComma = Number(payment.replaceAll(',', ''));

  return paymentWithoutComma;
};

export const convertToPriceFormat = (value: number): string => {
  const format = new Intl.NumberFormat('ko-KR').format(value);
  return format === '0' ? '' : format;
};
