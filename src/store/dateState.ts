import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { FilterModeTest } from '@/components/DetailFine/DateController/hook/useDateFilter';

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export interface DateState {
  baseDate: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  mode: FilterModeTest;
}

export const dateState = atom<DateState>({
  key: 'dateState',
  default: {
    //  겹치는 week ui 구성 요소
    baseDate: dayjs(),
    startDate: dayjs(),
    endDate: dayjs(),
    mode: 'day',
  },
  effects_UNSTABLE: [persistAtom],
});
