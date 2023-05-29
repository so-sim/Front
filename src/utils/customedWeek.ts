import { GA } from '@/constants/GA';
import dayjs, { Dayjs } from 'dayjs';

export const customedWeek = (baseDate: Dayjs): { title: string; id: string }[] => {
  const endOfWeek = Math.ceil((dayjs(baseDate).startOf('month').day() + dayjs(baseDate).endOf('month').date()) / 7);
  return new Array(endOfWeek).fill(0).map((_, i) => ({ title: `${String(i + 1)}주`, id: GA.FILTER.WEEK_DROP }));
};
