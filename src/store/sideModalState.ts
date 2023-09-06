import { ConfirmModalType } from '@/constants/Confirm';
import { isMobile } from 'react-device-detect';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type ModalType = 'situation_change' | 'alarm_request';

const { persistAtom } = recoilPersist({
  storage: localStorage,
});

export interface SideModalState {
  type: ModalType | null;
  isModal: boolean;
}

export const initialSideModalState = {
  type: null,
  isModal: false,
};

export const sideModalState = atom<SideModalState>({
  key: 'sideModalState',
  default: initialSideModalState,
  effects_UNSTABLE: isMobile ? [persistAtom] : [],
});
