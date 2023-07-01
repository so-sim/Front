import { GA } from '@/constants/GA';
import dayjs, { Dayjs } from 'dayjs';

const obj: Record<number, string> = {
  1: '첫',
  2: '둘',
  3: '셋',
  4: '넷',
  5: '다섯',
  6: '여섯',
};

export const customedWeek = (baseDate: Dayjs): { title: string; id: string }[] => {
  const endOfWeek = Math.ceil((dayjs(baseDate).startOf('month').day() + dayjs(baseDate).endOf('month').date()) / 7);
  return new Array(endOfWeek).fill(0).map((_, i) => ({ title: `${obj[i + 1]}째 주`, id: GA.FILTER.WEEK_DROP }));
};
