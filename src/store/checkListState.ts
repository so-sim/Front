import { atom } from 'recoil';
import { SelectedEventInfo } from '@/types/event';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  storage: localStorage,
});

export interface CheckListState {
  [key: string]: SelectedEventInfo;
}

export const initialCheckListState = {};

export const checkListState = atom<CheckListState>({
  key: 'checkListState',
  default: initialCheckListState,
  effects_UNSTABLE: [persistAtom],
});
