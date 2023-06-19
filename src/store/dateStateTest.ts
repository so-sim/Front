import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export interface DateStateTest {
  baseDateTest: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
}

export const dateStateTest = atom<DateStateTest>({
  key: 'dateState',
  default: {
    //  겹치는 week ui 구성 요소
    baseDateTest: dayjs(),
    startDate: dayjs(),
    endDate: dayjs(),
  },
  effects_UNSTABLE: [persistAtom],
});
