import { atom } from 'recoil';

export interface FirstVisit {
  isFirstVisit: boolean;
}

export const firstVisitState = atom<FirstVisit>({
  key: 'firstVisitState',
  default: {
    isFirstVisit: false,
  },
});
