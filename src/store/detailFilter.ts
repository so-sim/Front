import dayjs, { Dayjs } from 'dayjs';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface DetailFilter {
  groupId: number;
  nickname?: string;
  situation?: string;
  page: number;
  size: number;
}

export const detailFilter = atom<DetailFilter>({
  key: 'detailFilterState',
  default: {
    //  겹치는 week ui 구성 요소
    groupId: 0,
    nickname: '',
    situation: '',
    page: 0,
    size: 16,
  },
});
