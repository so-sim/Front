export type GroupColor = '#f86565' | '#f89a65' | '#f1d026' | '#658ef8' | '#9465f8';
export type GroupType = '스터디' | '학교, 교내/외 모임' | '회사, 사내 모임' | '취미, 동호회 모임' | '친구, 사모임' | '프로젝트' | '기타' | '';

export interface GroupInfo {
  title: string;
  nickname: string | null;
  type: string;
  coverColor: GroupColor;
}

export interface GroupId {
  groupId: number;
}

export interface GroupNickname {
  nickname: string;
}

export interface GroupDetail {
  isAdmin: boolean;
  isInto: boolean;
  title: string;
  adminNickname: string;
  groupId: number;
  coverColor: GroupColor;
  type: string;
  size: number;
}

export interface ParticipantList {
  adminId: number;
  adminNickname: string;
  memberList: { nickname: string; userId: number }[];
}

export interface CoverGroupInfo {
  title: string;
  coverColor: GroupColor;
  admin: string;
}

export interface GropuList {
  groupId: number;
  title: string;
  coverColor: GroupColor;
  type: string;
  adminNickname: string;
}

export interface GroupListWithIndex {
  next: boolean;
  index: number;
  groupList: GropuList[];
}
