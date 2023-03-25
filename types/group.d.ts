export type GroupColor = '#f86565' | '#f89a65' | '#f8e065' | '#658ef8' | '#9465f8';
export type GroupType = '스터디' | '학교, 교내/외 모임' | '회사, 사내 모임' | '취미, 동호회 모임' | '친구, 사모임' | '프로젝트' | '기타' | '';

export interface GroupInfo {
  title: string;
  nickname: string;
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
  title: string;
  adminNickname: string;
  groupId: number;
  coverColor: GroupColor;
  groupType: string;
}

export interface ParticipantList {
  adminId: number;
  adminNickname: string;
  nicknameList: string[];
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
  groupType: string;
  adminNickname: string;
}

export interface GroupListWithIndex {
  index: number;
  next: boolean;
  groupList: GropuList[];
}
