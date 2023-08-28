import { ConfirmModalType } from '@/constants/Confirm';
import { atom } from 'recoil';

// export interface NotificationModalState {
//   isModal: boolean;
// }

type NotificationModalStateType = boolean;

// export const initNotificationModalState = {
//   isModal: false,
// };

export const notificationModalState = atom<NotificationModalStateType>({
  key: 'notificationModalState',
  default: false,
});
