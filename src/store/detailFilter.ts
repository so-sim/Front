import { Situation } from '@/types/event';
import { atom } from 'recoil';

export interface DetailFilter {
  groupId: number;
  nickname: string;
  situation: Situation | '';
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
