import { FilterMode } from '@/pages/FineBook/DetailFine';
import dayjs from 'dayjs';
import { getTitleByMode, moveDateToWeek, updateDateByButtonMode, increaseTest, decreaseTest } from '../hook/useDateController';

describe('DateController', () => {
  describe('increaseDate', () => {
    it('mode가 month이며 baseDate가 6월인 상태에서 실행 시, 7월로 변경이 되어야하며, endDate는 7월의 마지막 일로 지정되어야 한다..', () => {
      const calendarDateState = increaseTest(dayjs('2023-06-17'), 'month');

      expect(calendarDateState.baseDateTest.date()).toBe(1);
      expect(calendarDateState.startDate.date()).toBe(1);
      expect(calendarDateState.endDate.date()).toBe(31);
      expect(calendarDateState.baseDateTest.month()).toBe(6);
    });

    it('mode가 week이며 baseDate가 6월 20일 상태에서 실행 시, startDate는 6월25일 endDate는 7월1일이여야한다.', () => {
      const calendarDateState = increaseTest(dayjs('2023-06-20'), 'week');

      expect(calendarDateState.baseDateTest.date()).toBe(25);
      expect(calendarDateState.startDate.date()).toBe(25);
      expect(calendarDateState.endDate.date()).toBe(1);
    });

    it('mode가 week이며 baseDate가 6월 28일 상태에서 실행 시, startDate는 7월2일 endDate는 7월 8일이여야한다.', () => {
      const calendarDateState = increaseTest(dayjs('2023-06-28'), 'week');

      expect(calendarDateState.baseDateTest.date()).toBe(2);
      expect(calendarDateState.startDate.date()).toBe(2);
      expect(calendarDateState.endDate.date()).toBe(8);
    });

    it('mode가 day이며 baseDate가 6월 29일 상태에서 실행 시, startDate는 6월30일 endDate는 6월30일이여야한다.', () => {
      const calendarDateState = increaseTest(dayjs('2023-06-29'), 'day');

      expect(calendarDateState.baseDateTest.date()).toBe(30);
      expect(calendarDateState.startDate.date()).toBe(30);
      expect(calendarDateState.endDate.date()).toBe(30);
    });
  });

  describe('decreaseTest', () => {
    it('mode가 month이며 baseDate가 6월인 상태에서 실행 시, 5월로 변경이 되어야하며, endDate는 5월의 마지막 일로 지정되어야 한다.', () => {
      const calendarDateState = decreaseTest(dayjs('2023-06-29'), 'month');

      expect(calendarDateState.baseDateTest.date()).toBe(1);
      expect(calendarDateState.startDate.date()).toBe(1);
      expect(calendarDateState.endDate.date()).toBe(31);
      expect(calendarDateState.baseDateTest.month()).toBe(4);
    });

    it('mode가 week이며 baseDate가 6월 20일 상태에서 실행 시, startDate는 6월11일 endDate는 6월17일이여야 한다.', () => {
      const calendarDateState = decreaseTest(dayjs('2023-06-20'), 'week');

      expect(calendarDateState.baseDateTest.date()).toBe(11);
      expect(calendarDateState.startDate.date()).toBe(11);
      expect(calendarDateState.endDate.date()).toBe(17);
    });

    it('mode가 week이며 baseDate가 7월 3일 상태에서 실행 시, startDate는 6월25일 endDate는 7월 1일이여야 한다', () => {
      const calendarDateState = decreaseTest(dayjs('2023-07-03'), 'week');

      expect(calendarDateState.baseDateTest.date()).toBe(25);
      expect(calendarDateState.startDate.date()).toBe(25);
      expect(calendarDateState.endDate.date()).toBe(1);
    });

    it('mode가 day이며 baseDate가 6월 29일 상태에서 실행 시, startDate는 6월28일 endDate는 6월28일이여야한다.', () => {
      const calendarDateState = decreaseTest(dayjs('2023-06-29'), 'day');

      expect(calendarDateState.baseDateTest.date()).toBe(28);
      expect(calendarDateState.startDate.date()).toBe(28);
      expect(calendarDateState.endDate.date()).toBe(28);
    });
  });

  describe('moveDateToWeek', () => {
    it('6월의 1주차로 변경했을 때, 시작 날짜는 5월 28일 이어야한다.', () => {
      const calendarDateState = moveDateToWeek(dayjs('2023-06-19'), 1);

      expect(calendarDateState.startDate.date()).toBe(28);
      expect(calendarDateState.endDate.date()).toBe(3);
      expect(calendarDateState.baseDateTest.date()).toBe(1);
    });

    it('6월의 마지막 주차로 변경했을 때, 시작 날짜는 6월 25일 이어야한다.', () => {
      const calendarDateState = moveDateToWeek(dayjs('2023-06-19'), 5);

      expect(calendarDateState.startDate.date()).toBe(25);
      expect(calendarDateState.endDate.date()).toBe(1);
      expect(calendarDateState.baseDateTest.date()).toBe(25);
    });
  });

  describe('updateDateByButtonMode', () => {
    it('baseDate거 6월 19일일 경우, week버튼을 누르면 startDate는 18일이어야 한다.', () => {
      const calendarDateState = updateDateByButtonMode(dayjs('2023-06-19'), 'week');

      expect(calendarDateState.startDate.date()).toBe(18);
      expect(calendarDateState.endDate.date()).toBe(24);
      expect(calendarDateState.baseDateTest.date()).toBe(18);
    });

    it('baseDate거 6월 1일일 경우, week버튼을 누르면 startDate는 28일이어야 한다.', () => {
      const calendarDateState = updateDateByButtonMode(dayjs('2023-06-01'), 'week');

      expect(calendarDateState.startDate.date()).toBe(28);
      expect(calendarDateState.endDate.date()).toBe(3);
      expect(calendarDateState.baseDateTest.date()).toBe(1);
    });

    it('baseDate거 6월 1일일 경우, day버튼을 누르면 startDate는 1일이어야 한다.', () => {
      const calendarDateState = updateDateByButtonMode(dayjs('2023-06-01'), 'day');

      expect(calendarDateState.startDate.date()).toBe(1);
      expect(calendarDateState.endDate.date()).toBe(1);
      expect(calendarDateState.baseDateTest.date()).toBe(1);
    });

    it('baseDate거 6월 19일일 경우, month버튼을 누르면 startDate는 1일이어야 한다.', () => {
      const calendarDateState = updateDateByButtonMode(dayjs('2023-06-01'), 'month');

      expect(calendarDateState.startDate.date()).toBe(1);
      expect(calendarDateState.endDate.date()).toBe(30);
      expect(calendarDateState.baseDateTest.date()).toBe(1);
    });
  });

  describe('getTitleByMode', () => {
    let dateState;
    it('6월 19일의 title은 "06월 19일"이다', () => {
      dateState = {
        baseDateTest: dayjs('2023-06-19'),
        startDate: dayjs('2023-06-19'),
        endDate: dayjs('2023-06-19'),
        mode: 'day' as FilterMode,
      };
      const title = getTitleByMode(dateState, 'day');

      expect(title).toBe('06월 19일');
    });

    it('6월 4주차의 title은 "06월 18일 - 06월 24일"이다', () => {
      dateState = {
        baseDateTest: dayjs('2023-06-19'),
        startDate: dayjs('2023-06-18'),
        endDate: dayjs('2023-06-24'),
        mode: 'day' as FilterMode,
      };
      const title = getTitleByMode(dateState, 'week');

      expect(title).toBe('06월 18일 - 06월 24일');
    });

    it('6월의 title은 "06월"이다', () => {
      dateState = {
        baseDateTest: dayjs('2023-06-01'),
        startDate: dayjs('2023-06-01'),
        endDate: dayjs('2023-06-30'),
        mode: 'day' as FilterMode,
      };
      const title = getTitleByMode(dateState, 'month');

      expect(title).toBe('06월');
    });
  });
});
