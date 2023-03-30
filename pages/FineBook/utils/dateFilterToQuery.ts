/**
 * year: 2023, month: 3 이렇게 모든 곳에서 넣어줘야 함
 * 좀 더 간편하게 쓸 방법은 없을까?
 * 외부에서는 선택된 날짜만 받아, 그리고 업데이트해
 * page도 전달받아야 돼
 * 아니야 확실히 숫자만 전달하는게 편해
 * year: 3 month: 4 이렇게 전달해
 */
/**
 * 이렇게 고려해야 함
 * 그럼 굳이 type을 나누지 않아도 객체 속성만 갈아끼워주면 쌉가능
 * {year: number, month: number, week: number, day: number, userId: number, paymentType: con | non | full}
 */

/**
 * 추가 고려사항 : 월간, 주간, 일간 필터는 동시에 적용 불가능함
 * 월간 : week, day가 둘 다 없을 때 설정
 * 주간 : day가 없어야 함. week에 값이 들어가면 date 삭제 시켜야 함
 * 일간 : week가 없어야 함. day에 값이 들어가면 week 삭제해야 함
 */

export interface DateFilterProperty {
  year?: number;
  month?: number;
  week?: number | null;
  day?: number;
  userId?: number;
  paymentType?: string;
  page?: number;
}

/**
 *
 * @param dateFilterProperty : DateFilterProperty
 * @returns string
 */
export const dateFilterToQuery = (dateFilterProperty: Partial<DateFilterProperty>): string => {
  const queries = Object.entries(dateFilterProperty)
    .reduce((prev, curr) => `${prev}&${curr[0]}=${curr[1]}`, '')
    .slice(1);

  return queries;
};
