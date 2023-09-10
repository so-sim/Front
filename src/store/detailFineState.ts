import { atom } from 'recoil';

export const detailFineState = atom<boolean>({
  key: 'detailFineState',
  default: false,
});
