import dayjs from 'dayjs';
import { moveDateToWeek } from '../hook/useDateController';

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
});
