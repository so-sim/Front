import { ConfirmModalType } from '@/constants/Confirm';
import { atom } from 'recoil';

export interface ConfirmModalState {
  type: ConfirmModalType | null;
  confirm: (() => Promise<void>) | (() => void);
  cancel?: () => void;
  id?: string;
}

export const initialConfirmModalState = {
  type: null,
  confirm: async () => {},
  cancel: () => {},
  id: '',
};

export const confirmModalState = atom<ConfirmModalState>({
  key: 'confirmModalState',
  default: initialConfirmModalState,
});
