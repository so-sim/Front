import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export interface DateState {
  baseDate: Dayjs;
  selectedDate: Dayjs | null;
  week: number | null;
}

export const dateState = atom<DateState>({
  key: 'dateState',
  default: {
    baseDate: dayjs(),
    selectedDate: null,
    week: 2,
  },
  effects_UNSTABLE: [persistAtom],
});
