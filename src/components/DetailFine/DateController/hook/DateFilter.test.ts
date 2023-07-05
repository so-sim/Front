import { DateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { DateFilter, IDateFilter } from './DateFilter';
import { FilterModeTest } from './useDateFilter';

describe('customFilter', () => {
  let dateFilter: IDateFilter;
  beforeEach(() => {
    dateFilter = new DateFilter('custom') as any;
  });

  it('increaseDateByMode를 실행했을 때 마지막 날의 다음 날이 필터링 되어야 한다.', () => {
    const calendarDate = {
      baseDate: dayjs('2023.07.01'),
      startDate: dayjs('2023.07.03'),
      endDate: dayjs('2023.07.31'),
      mode: 'custom' as FilterModeTest,
    };

    const result = dateFilter.increaseDateByMode(calendarDate);

    expect(result.baseDate.date()).toBe(1);
    expect(result.startDate.date()).toBe(1);
    expect(result.mode).toBe('day');
  });

  it('decreaseDateByMode를 실행했을 때 첫날의 이전 날이 필터링 되어야 한다.', () => {
    const calendarDate = {
      baseDate: dayjs('2023.07.01'),
      startDate: dayjs('2023.07.03'),
      endDate: dayjs('2023.07.31'),
      mode: 'custom' as FilterModeTest,
    };

    const result = dateFilter.decreaseDateByMode(calendarDate);

    expect(result.baseDate.date()).toBe(30);
    expect(result.startDate.date()).toBe(30);
    expect(result.mode).toBe('day');
  });

  it('getTitle를 실행했을 때 제목은 첫날 - 마지막날 포멧이어야 한다.', () => {
    const calendarDate: DateState = {
      baseDate: dayjs('2023.07.01'),
      startDate: dayjs('2023.07.03'),
      endDate: dayjs('2023.07.31'),
      mode: 'custom',
    };

    const result = dateFilter.getTitle(calendarDate);

    expect(result).toBe('07월 03일 - 07월 31일');
  });

  it('getTitle를 실행했을 때 제목은 첫날 - 마지막날 포멧이어야 한다.', () => {
    const calendarDate: DateState = {
      baseDate: dayjs('2023.07.01'),
      startDate: dayjs('2023.07.03'),
      endDate: dayjs('2023.08.31'),
      mode: 'custom',
    };

    const result = dateFilter.updateDateByButtonMode(calendarDate, 'custom');

    expect(result.mode).toBe('custom');
    expect(result.baseDate.month() + 1).toBe(7);
    expect(result.baseDate.date()).toBe(3);
  });

  it('updateDateByButtonMode를 실행했을 때 해당 기간이 필터링 되어야 한다.', () => {
    const calendarDate = {
      baseDate: dayjs('2023.07.01'),
      startDate: dayjs('2023.07.03'),
      endDate: dayjs('2023.07.31'),
      mode: 'custom' as FilterModeTest,
    };

    const result = dateFilter.updateDateByButtonMode(calendarDate, 'custom');

    expect(result.baseDate.date()).toBe(3);
    expect(result.startDate.date()).toBe(3);
    expect(result.endDate.date()).toBe(31);
    expect(result.mode).toBe('custom');
  });
});

describe('dayFilter', () => {
  let dateFilter: IDateFilter;
  const calendarDate: DateState = {
    baseDate: dayjs('2023.07.01'),
    startDate: dayjs('2023.07.01'),
    endDate: dayjs('2023.07.01'),
    mode: 'day',
  };
  beforeEach(() => {
    dateFilter = new DateFilter('day') as any;
  });

  it('increaseDateByMode를 실행했을 때 다음 날이 필터링 되어야 한다.', () => {
    const result = dateFilter.increaseDateByMode(calendarDate);

    expect(result.baseDate.date()).toBe(2);
    expect(result.startDate.date()).toBe(2);
    expect(result.mode).toBe('day');
  });

  it('decreaseDateByMode를 실행했을 때 이전 날이 필터링 되어야 한다.', () => {
    const result = dateFilter.decreaseDateByMode(calendarDate);

    expect(result.baseDate.date()).toBe(30);
    expect(result.startDate.date()).toBe(30);
    expect(result.mode).toBe('day');
  });

  it('getTitle를 실행했을 때 제목은 00월 00일 포멧이어야 한다.', () => {
    const result = dateFilter.getTitle(calendarDate);

    expect(result).toBe('07월 01일');
  });

  it('updateDateByButtonMode를 실행했을 때 baseDate가 필터링 되어야 한다.', () => {
    const calendarDate: DateState = {
      baseDate: dayjs('2023.07.02'),
      startDate: dayjs('2023.07.02'),
      endDate: dayjs('2023.07.08'),
      mode: 'week',
    };

    const result = dateFilter.updateDateByButtonMode(calendarDate, 'day');

    expect(result.baseDate.date()).toBe(2);
    expect(result.startDate.date()).toBe(2);
    expect(result.endDate.date()).toBe(2);
    expect(result.mode).toBe('day');
  });
});
