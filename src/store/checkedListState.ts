import { SelectedEventInfo } from '@/types/event';
import { atom } from 'recoil';

export type CheckedListState = Set<number>;
export const initialCheckedListState = new Set<number>();

export const checkedListState = atom<CheckedListState>({
  key: 'checkedListState',
  default: initialCheckedListState,
});
