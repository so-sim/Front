import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist({
  storage: localStorage,
});

export interface UserState {
  email: string | null;
  userId: number | null;
}

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    email: null,
    userId: null,
  },
  effects_UNSTABLE: [persistAtom],
});
