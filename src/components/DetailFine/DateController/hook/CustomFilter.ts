import { DateState } from '@/store/dateState';
import dayjs from 'dayjs';
import { FilterModeTest } from './useDateFilter';
export class CustomFilter {
  increaseDateByMode = (calendarDate: DateState): DateState => {
    const nextDate = dayjs(calendarDate.endDate).add(1, 'day');
    return {
      baseDate: nextDate,
      startDate: nextDate,
      endDate: nextDate,
      mode: 'day',
    };
  };
  decreaseDateByMode = (calendarDate: DateState): DateState => {
    const prevDate = dayjs(calendarDate.endDate).subtract(1, 'day');
    return {
      baseDate: prevDate,
      startDate: prevDate,
      endDate: prevDate,
      mode: 'day',
    };
  };
  /**
   * custom 업데이트는 calendarDate로 변경하는 것이 아니라 newCalendarDate
   * 즉, 새로들어오는 값이 한번에 갈아 끼워지는 것임
   * 이유 :
   * 1. 상세 기간을 설정하고 조회하기 전에는 기존 필터링이 유지되어야 함
   * 2. 그렇게 되려면 calendarDate는 유지하되(recoil값), 새로운 state값이 한번에 들어와서 갈아 끼워지는 구조
   */
  updateDateByButtonMode = (newCalendarDate: DateState, buttonMode: FilterModeTest): DateState => {
    return {
      baseDate: dayjs(newCalendarDate.startDate),
      startDate: dayjs(newCalendarDate.startDate),
      endDate: dayjs(newCalendarDate.endDate),
      mode: buttonMode,
    };
  };
  getTitle = (calendarDate: DateState): string => {
    const startDate = dayjs(calendarDate.startDate).format('MM월 DD일');
    const endDate = dayjs(calendarDate.endDate).format('MM월 DD일');

    return `${startDate} - ${endDate}`;
  };
}
