import { SelectedEventInfo } from '@/types/event';
import { atom } from 'recoil';

export type CheckedListState = Set<number>;
export const initialCheckedListState = new Set<number>();

/**
 * useCheckSet 과 동일한 이유로 남겨두게 되었습니다.
 */

export const checkedListState = atom<CheckedListState>({
  key: 'checkedListState',
  default: initialCheckedListState,
});
