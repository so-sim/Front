import { ConfirmModalType } from '@/constants/Confirm';
import { SelectedEventInfo } from '@/types/event';
import { atom } from 'recoil';

/**
 * 날짜, 금액, 납부여부, 사유
 */
export type ContinueFormState = SelectedEventInfo | null;

export const initialConfirmModalState = {};

export const continueFormState = atom<ContinueFormState>({
  key: 'continueFormState',
  default: null,
});

// {
//     date: '',
//     amount: 0,
//     situation: '미납',
//     memo: '',
//     nickname: '',
//     ground: '지각',
//   }
