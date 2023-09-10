import { atom } from 'recoil';

export const requestNotificationState = atom<number[]>({
  key: 'requestNotificationState',
  default: [],
});
