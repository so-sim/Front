import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export interface UserState {
  email: string;
  userId: number | null;
  isPermit: boolean;
}

export const userState = atom<UserState>({
  key: 'userState',
  default: {
    email: '',
    userId: null,
    isPermit: false,
  },
  effects_UNSTABLE: [persistAtom],
});
