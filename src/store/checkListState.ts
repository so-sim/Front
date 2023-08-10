import { atom } from 'recoil';
import { SelectedEventInfo } from '@/types/event';

export interface CheckListState {
  [key: string]: SelectedEventInfo;
}

export const initialCheckListState = {};

export const checkListState = atom<CheckListState>({
  key: 'checkListState',
  default: initialCheckListState,
});
