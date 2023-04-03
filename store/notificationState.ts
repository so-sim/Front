import { atom, selector, selectorFamily } from 'recoil';

type NotificationText = '벌금 내역이 추가되었습니다.' | '데이터를 불러오는데 실패했습니다.' | '';

export interface NotificationState {
  notifications: NotificationText[];
}

export const notificationState = atom<NotificationText[]>({
  key: 'notificationState',
  default: [],
});

// export const notifiactionSelector = selector({
//   key: 'notificationSelector',
//   get: ({ get }) => {
//     const notifications = get(notificationState);
//     return notifications;
//   },
//   set: ({ get, set }, newNotification) => {
//     set(notificationState, get(notificationState).concat(newNotification));
//   },
// });
