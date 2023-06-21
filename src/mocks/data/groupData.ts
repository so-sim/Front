import { GroupColor, GroupType } from '@/types/group';

// Todo: tanstack-query 수정하면서 기존 GroupInfo 타입 이 형태로 변경해야 함
type GroupInfo = {
  title: string;
  adminNickname: string;
  coverColor: GroupColor;
  groupId: number;
  type: GroupType;
  size: number;
};

export const GROUP_LIST: GroupInfo[] = [
  { title: '전국 노래 자랑', adminNickname: '윤하나둘셋넷', coverColor: '#f86565', groupId: 1, type: '스터디', size: 2 },
  { title: '전국 노래 자랑', adminNickname: '윤하나', coverColor: '#f86565', groupId: 2, type: '스터디', size: 2 },
  { title: '전국 노래 자랑', adminNickname: '윤둘', coverColor: '#f86565', groupId: 3, type: '스터디', size: 2 },
  { title: '전국 노래 자랑', adminNickname: '윤셋', coverColor: '#f86565', groupId: 4, type: '스터디', size: 2 },
  { title: '전국 노래 자랑', adminNickname: '윤넷', coverColor: '#f86565', groupId: 5, type: '스터디', size: 2 },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘', coverColor: '#f86565', groupId: 6, type: '스터디', size: 2 },
  { title: '전국 노래 자랑', adminNickname: '윤하나셋넷', coverColor: '#f86565', groupId: 7, type: '스터디', size: 2 },
  { title: '전국 노래 자랑', adminNickname: '윤둘셋넷', coverColor: '#f86565', groupId: 8, type: '스터디', size: 2 },
  { title: '전국 노래 자랑', adminNickname: '윤하나둘넷', coverColor: '#f86565', groupId: 9, type: '스터디', size: 2 },
];
