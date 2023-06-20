import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { FilterMode } from '@/pages/FineBook/DetailFine';

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export interface DateStateTest {
  baseDateTest: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  mode: FilterMode;
}

export const dateStateTest = atom<DateStateTest>({
  key: 'dateState',
  default: {
    //  겹치는 week ui 구성 요소
    baseDateTest: dayjs(),
    startDate: dayjs(),
    endDate: dayjs(),
    mode: 'day',
  },
  effects_UNSTABLE: [persistAtom],
});
