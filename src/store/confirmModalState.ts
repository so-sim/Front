import { ConfirmModalType } from '@/constants/Confirm';
import { atom } from 'recoil';

export interface ConfirmModalState {
  type: ConfirmModalType | null;
  confirm: () => Promise<void>;
  cancel?: () => void;
}

export const initialConfirmModalState = {
  type: null,
  confirm: async () => {},
  cancel: () => {},
};

export const confirmModalState = atom<ConfirmModalState>({
  key: 'confirmModalState',
  default: initialConfirmModalState,
});
