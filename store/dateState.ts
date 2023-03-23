import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export interface DateState {
  calendarBaseDate: Dayjs;
  selectedDate: Dayjs | null;
  week: string;
  month: string;
  day: string;
}

export const dateState = atom<DateState>({
  key: 'dateState',
  default: {
    calendarBaseDate: dayjs(),
    selectedDate: null,
    week: '02',
    month: '03',
    day: '',
  },
  effects_UNSTABLE: [persistAtom],
});
