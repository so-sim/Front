export const changeNumberToMoney = (value: number): string => {
  const format = new Intl.NumberFormat('ko-KR').format(value);
  return format === '0' ? '' : format;
};
