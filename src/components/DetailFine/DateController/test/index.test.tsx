import dayjs from 'dayjs';
import { getTitleByMode, moveDateToWeek, updateDateByButtonMode } from '../hook/useDateController';

describe('DateController', () => {
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
      };
      const title = getTitleByMode(dateState, 'day');

      expect(title).toBe('06월 19일');
    });

    it('6월 4주차의 title은 "06월 18일 - 06월 24일"이다', () => {
      dateState = {
        baseDateTest: dayjs('2023-06-19'),
        startDate: dayjs('2023-06-18'),
        endDate: dayjs('2023-06-24'),
      };
      const title = getTitleByMode(dateState, 'week');

      expect(title).toBe('06월 18일 - 06월 24일');
    });

    it('6월의 title은 "06월"이다', () => {
      dateState = {
        baseDateTest: dayjs('2023-06-01'),
        startDate: dayjs('2023-06-01'),
        endDate: dayjs('2023-06-30'),
      };
      const title = getTitleByMode(dateState, 'month');

      expect(title).toBe('06월');
    });
  });
});
