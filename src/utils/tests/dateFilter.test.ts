import { FilterMode } from '@/pages/FineBook/DetailFine';
import dayjs from 'dayjs';
import { DateFilter } from '../dateFilter/dateFilter';
import { dateFilterToQuery } from '../dateFilterToQuery';

describe('dateFilterTitle 테스트', () => {
  it('mode가 day일 때 리턴 값은 "00월 00일로 리턴되어야 함"', () => {
    const mode: FilterMode = 'day';
    const dateFilter = new DateFilter(mode, null);
    const baseDate = dayjs('2023.04.09');

    expect(dateFilter.getTitle(baseDate)).toBe('04월 09일');
  });

  it('mode가 week일 때 리턴 값은 "00월 00일 - 00월 00일"이고, week가 null이면 에러 반환', () => {
    const mode: FilterMode = 'week';
    const dateFilter = new DateFilter(mode, 3);
    const baseDate = dayjs('2023.04.09');

    expect(dateFilter.getTitle(baseDate)).toBe('04월 09일 - 04월 15일');
  });
});

describe('dateFilterToQuery 테스트', () => {
  it('객체가 들어왔을 때 query parameter로 반환', () => {
    expect(dateFilterToQuery({ year: 2023, month: 4, day: 9 })).toBe('year=2023&month=4&day=9');
  });

  it('null이나 빈문자열이 객체에 존재할 시 query parameter에서 제외', () => {
    expect(dateFilterToQuery({ year: 2023, month: 4, day: 9, week: null, nickname: '' })).toBe('year=2023&month=4&day=9');
  });
});

describe('updateCalendarByType', () => {
  it('filter가 month 모드일 경우', () => {
    const dateState = { baseDate: dayjs('2023.04.09'), selectedDate: null, week: null };
    const mode: FilterMode = 'month';
    const dateFilter = new DateFilter(mode, null);

    expect(dateFilter.decreaseDate(dateState.baseDate).baseDate.month() + 1).toBe(3);
    expect(dateFilter.updateDateStateByMode(dateState.baseDate, 'month').baseDate.month() + 1).toBe(4);
    expect(dateFilter.increaseDate(dateState.baseDate).baseDate.month() + 1).toBe(5);
  });

  describe('filter가 week 모드일 경우', () => {
    it('month -> week로 모드 변경', () => {
      const dateState = { baseDate: dayjs('2023.04.01'), selectedDate: null, week: null };
      const mode: FilterMode = 'month';
      const dateFilter = new DateFilter(mode, null);

      expect(dateFilter.updateDateStateByMode(dateState.baseDate, 'week').week).toBe(1);
    });

    it('filter가 week일 때 증가/감소', () => {
      const dateState = { baseDate: dayjs('2023.04.01'), selectedDate: null, week: 1 };
      const mode: FilterMode = 'week';
      const dateFilter = new DateFilter(mode, null);

      expect(dateFilter.increaseDate(dateState.baseDate).week).toBe(2);
      expect(dateFilter.decreaseDate(dateState.baseDate).week).toBe(4);
      expect(dateFilter.decreaseDate(dateState.baseDate).baseDate.month() + 1).toBe(3);
    });
  });

  describe('filter가 day모드일 경우', () => {
    it('month -> day', () => {
      const dateState = { baseDate: dayjs('2023.04.01'), selectedDate: null, week: null };
      const mode: FilterMode = 'week';
      const dateFilter = new DateFilter(mode, null);
      const changedDateState = dateFilter.updateDateStateByMode(dateState.baseDate, 'day');

      expect(changedDateState.week).toBe(null);
      expect(changedDateState.baseDate.month() === changedDateState.selectedDate?.month()).toBe(true);
      expect(changedDateState.selectedDate?.format('YYYY.MM.DD')).toBe('2023.04.01');
    });

    it('day일 때 증가/감소', () => {
      const dateState = { baseDate: dayjs('2023.04.01'), selectedDate: dayjs('2023.04.01'), week: null };
      const mode: FilterMode = 'day';
      const dateFilter = new DateFilter(mode, null);

      expect(dateFilter.increaseDate(dateState.baseDate).selectedDate?.date()).toBe(2);
      expect(dateFilter.decreaseDate(dateState.baseDate).selectedDate?.date()).toBe(31);
      expect(dateFilter.decreaseDate(dateState.baseDate).baseDate.month() + 1).toBe(3);
    });
  });
});
