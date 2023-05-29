/**
 * 금액(1,000,000)을 넘겨 받아서 콤마를 제거하는 함수
 */

export const removeCommaFromPayment = (payment: string): number => {
  return Number(payment.replaceAll(',', ''));
};
