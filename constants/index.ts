import { Theme } from '@emotion/react';

export type GroupColor = 'red' | 'orange' | 'yellow' | 'blue' | 'purple';
// export type GroupColor = keyof Theme['cover'];

export const PLACEHOLDER = {
  NAME: '모임에서 사용할 이름을 입력해 주세요.',
  GROUP: '이름을 입력해 주세요.',
};

export const DROPDOWN_LIST = [
  { title: '학교, 교내/외 모임' },
  { title: '회사, 사내 모임' },
  { title: '취미, 동호회 모임' },
  { title: '친구, 사모임' },
  { title: '프로젝트' },
  { title: '기타' },
];

export const COLORS: GroupColor[] = ['red', 'orange', 'yellow', 'blue', 'purple'];
