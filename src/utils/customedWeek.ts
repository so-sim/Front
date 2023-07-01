import { GA } from '@/constants/GA';
import dayjs, { Dayjs } from 'dayjs';

export const weekList = ['첫째 주', '둘째 주', '셋째 주', '넷째 주', '다섯째 주', '여섯째 주'];

export const customedWeek = (baseDate: Dayjs): { title: string; id: string }[] => {
  const endOfWeek = Math.ceil((dayjs(baseDate).startOf('month').day() + dayjs(baseDate).endOf('month').date()) / 7);
  return new Array(endOfWeek).fill(0).map((_, i) => ({ title: `${weekList[i]}`, id: GA.FILTER.WEEK_DROP }));
};
