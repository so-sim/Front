import { GA } from '@/constants/GA';
import dayjs, { Dayjs } from 'dayjs';

export const textOfWeek: Record<number, string> = {
  1: '첫째 주',
  2: '둘째 주',
  3: '셋째 주',
  4: '넷째 주',
  5: '다섯째 주',
  6: '여섯째 주',
};

export const numberOfWeek: Record<string, number> = {
  '첫째 주': 1,
  '둘째 주': 2,
  '셋째 주': 3,
  '넷째 주': 4,
  '다섯째 주': 5,
  '여섯째 주': 6,
};

export const customedWeek = (baseDate: Dayjs): { title: string; id: string }[] => {
  const endOfWeek = Math.ceil((dayjs(baseDate).startOf('month').day() + dayjs(baseDate).endOf('month').date()) / 7);
  return new Array(endOfWeek).fill(0).map((_, i) => ({ title: `${textOfWeek[i + 1]}`, id: GA.FILTER.WEEK_DROP }));
};
