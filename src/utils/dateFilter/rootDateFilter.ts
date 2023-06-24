import { FilterMode } from '@/pages/FineBook/DetailFine';
import { DateState } from '@/store/dateState';
import dayjs, { Dayjs } from 'dayjs';

export class RootDateFilter {
  updateDateStateByMode = (baseDate: Dayjs, mode: FilterMode) => {
    const changedDate: Dayjs = this.setStartDayByMode(baseDate, mode);

    return {
      baseDate: changedDate,
      week: mode === 'week' ? Math.ceil((changedDate.startOf('month').day() + changedDate.date()) / 7) : null,
      selectedDate: mode === 'day' ? changedDate : null,
    };
  };

  goToWeek = ({ baseDate }: DateState, week: number): DateState => {
    const startOfMonthDay = dayjs(baseDate).set('date', 1).startOf('month').day();
    const startOfWeekDate = (week - 1) * 7 + 1 - startOfMonthDay;

    if (week === 1) {
      const startDateOfMonth = dayjs(baseDate).startOf('month');

      return {
        baseDate: startDateOfMonth,
        startDate: startDateOfMonth.startOf('week'),
        endDate: startDateOfMonth.endOf('week'),
        mode: 'week' as FilterMode,
      };
    }
    const startDate = dayjs(baseDate).set('date', startOfWeekDate);
    const endDate = dayjs(baseDate).set('date', startOfWeekDate).endOf('week');

    return { baseDate: startDate, startDate, endDate, mode: 'week' as FilterMode };
  };

  // --- 내부적으로 서브클래스에서 사용하는 아이들 ---
  protected setStartDayByMode = (baseDate: Dayjs, mode: FilterMode): Dayjs => {
    const startDayOfMonth = dayjs(baseDate).startOf('month');

    switch (mode) {
      case 'month':
        return startDayOfMonth;
      case 'week':
        const startDay = dayjs(baseDate).startOf('week');
        const endDay = dayjs(baseDate).endOf('week');

        if (startDay.month() === endDay.month()) return startDay;
        if (startDay.date() > dayjs(baseDate).date()) return startDayOfMonth;

        return startDay;
      case 'day':
        return dayjs(baseDate);
    }
  };

  protected padStart = (number: number): string => {
    return String(number).padStart(2, '0');
  };
}
