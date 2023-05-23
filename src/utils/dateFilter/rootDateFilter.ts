import { FilterMode } from '@/pages/FineBook/DetailFine';
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
