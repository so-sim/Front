import { atom } from 'recoil';

export type SearchMemberState = { nickname: string };

export const searchMemberState = atom<SearchMemberState>({
  key: 'searchMemberState',
  default: { nickname: '' },
});
