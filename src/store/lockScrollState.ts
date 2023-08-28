import { SelectedEventInfo } from '@/types/event';
import { atom } from 'recoil';

export type LockScrollState = Set<string>;
export const initialLockScrollState = new Set<string>();

export const lockScrollState = atom<LockScrollState>({
  key: 'lockScollState',
  default: initialLockScrollState,
});
