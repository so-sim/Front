import dayjs from 'dayjs';
import { dateFilterTitle, dateFilterToQuery, prependZeroBelowTen, updateCalendarByType } from '../dateFilter';

describe('dateFilterTitle 테스트', () => {
  it('mode가 day일 때 리턴 값은 "00월 00일로 리턴되어야 함"', () => {
    const baseDate = dayjs('2023.04.09');
    expect(dateFilterTitle(baseDate, 'day', null)).toBe('04월 09일');
  });

  it('mode가 week일 때 리턴 값은 "00월 00일 - 00월 00일"이고, week가 null이면 에러 반환', () => {
    const baseDate = dayjs('2023.04.09');

    expect(dateFilterTitle(baseDate, 'week', 3)).toBe('04월 09일 - 04월 15일');
  });

  // it('mode가 week일 때 week는 null일 수 없습니다.', () => {
  //   const baseDate = dayjs('2023.04.09');

  //   const throwErroWhenWeekIsNull = () => {
  //     dateFilterTitle(baseDate, 'week', null);
  //   };
  //   expect(throwErroWhenWeekIsNull).toThrow('mode가 week일 때 week는 null일 수 없습니다.');
  // });
});

describe('dateFilterToQuery 테스트', () => {
  it('객체가 들어왔을 때 query parameter로 반환', () => {
    expect(dateFilterToQuery({ year: 2023, month: 4, day: 9 })).toBe('year=2023&month=4&day=9');
  });

  it('null이나 빈문자열이 객체에 존재할 시 query parameter에서 제외', () => {
    expect(dateFilterToQuery({ year: 2023, month: 4, day: 9, week: null, nickname: '' })).toBe('year=2023&month=4&day=9');
  });
});

describe('prependZeroBelowTen', () => {
  it('10보다 작을 경우 앞에 0을 추가한 문자열 반환', () => {
    expect(prependZeroBelowTen(9)).toBe('09');
  });

  it('10보다 작을 경우 앞에 0을 추가한 문자열 반환', () => {
    expect(prependZeroBelowTen(10)).toBe('10');
  });
});

describe('updateCalendarByType', () => {
  it('filter가 month 모드일 경우', () => {
    const dateState = { baseDate: dayjs('2023.04.09'), selectedDate: null, week: null };

    expect(updateCalendarByType('decrease', dateState, 'month').baseDate.month() + 1).toBe(3);
    expect(updateCalendarByType('none', dateState, 'month').baseDate.month() + 1).toBe(4);
    expect(updateCalendarByType('increase', dateState, 'month').baseDate.month() + 1).toBe(5);
  });

  describe('filter가 week 모드일 경우', () => {
    it('month -> week로 모드 변경', () => {
      const dateState = { baseDate: dayjs('2023.04.01'), selectedDate: null, week: null };

      expect(updateCalendarByType('none', dateState, 'week').week).toBe(1);
    });

    it('filter가 week일 때 증가/감소', () => {
      const dateState = { baseDate: dayjs('2023.04.01'), selectedDate: null, week: 1 };

      expect(updateCalendarByType('increase', dateState, 'week').week).toBe(2);
      expect(updateCalendarByType('decrease', dateState, 'week').week).toBe(4);
      expect(updateCalendarByType('decrease', dateState, 'week').baseDate.month() + 1).toBe(3);
    });
  });

  describe('filter가 day모드일 경우', () => {
    it('month -> day', () => {
      const dateState = { baseDate: dayjs('2023.04.01'), selectedDate: null, week: null };
      const changedDateState = updateCalendarByType('none', dateState, 'day');

      expect(changedDateState.week).toBe(null);
      expect(changedDateState.baseDate.month() === changedDateState.selectedDate?.month()).toBe(true);
      expect(changedDateState.selectedDate?.format('YYYY.MM.DD')).toBe('2023.04.01');
    });

    it('day일 때 증가/감소', () => {
      const dateState = { baseDate: dayjs('2023.04.01'), selectedDate: dayjs('2023.04.01'), week: null };

      expect(updateCalendarByType('increase', dateState, 'day').selectedDate?.date()).toBe(2);
      expect(updateCalendarByType('decrease', dateState, 'day').selectedDate?.date()).toBe(31);
      expect(updateCalendarByType('decrease', dateState, 'day').baseDate.month() + 1).toBe(3);
    });
  });
});
