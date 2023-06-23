import { EventInfoTest, Ground, Situation } from '@/types/event';

export const DETAILS: EventInfoTest[] = [
  { eventId: 1, groupId: 1, nickname: '종현', date: '2023.06.25', amount: 10_000, ground: '지각', memo: '', situation: '미납' },
  { eventId: 2, groupId: 1, nickname: '정민', date: '2023.06.30', amount: 10_000, ground: '결석', memo: '', situation: '완납' },
  { eventId: 3, groupId: 1, nickname: '윤하나', date: '2023.07.01', amount: 10_000, ground: '지각', memo: '', situation: '미납' },
  { eventId: 4, groupId: 1, nickname: '가람', date: '2023.06.25', amount: 10_000, ground: '과제 안 함', memo: '', situation: '확인중' },
  { eventId: 5, groupId: 1, nickname: '나경', date: '2023.07.04', amount: 10_000, ground: '지각', memo: '', situation: '확인중' },
  { eventId: 6, groupId: 1, nickname: '현교', date: '2023.07.04', amount: 10_000, ground: '지각', memo: '', situation: '미납' },
  { eventId: 7, groupId: 1, nickname: '재민', date: '2023.07.04', amount: 10_000, ground: '지각', memo: '', situation: '완납' },
];
