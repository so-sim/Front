import { ConfirmModalType } from '@/constants/Confirm';
import { atom } from 'recoil';

export type ModalType = 'situation_change' | 'alarm_request';

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
});
