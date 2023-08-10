import { atom } from 'recoil';

export interface CheckListState {
  [key: string]: any;
}

export const initialCheckListState = {};

export const checkListState = atom<CheckListState>({
  key: 'checkListState',
  default: initialCheckListState,
});
