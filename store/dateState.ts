import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export interface DateState {
  baseDate: Dayjs;
  selectedDate: Dayjs | null;
  week: string;
  month: string;
  day: string;
}

export const dateState = atom<DateState>({
  key: 'dateState',
  default: {
    baseDate: dayjs(),
    selectedDate: null,
    week: '02',
    month: '',
    day: '',
  },
  effects_UNSTABLE: [persistAtom],
});
