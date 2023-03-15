export type GroupColor = '#f86565' | '#f89a65' | '#f8e065' | '#658ef8' | '#9465f8';
export type GroupType = '스터디' | '학교, 교내/외 모임' | '회사, 사내 모임' | '취미, 동호회 모임' | '친구, 사모임' | '프로젝트' | '기타' | '';

export interface GroupInfo {
  title: string;
  type: string;
  coverColor: GroupColor;
}

export interface GroupId {
  groupId: string;
}

export interface GroupNickname {
  nickname: string;
}

export interface GroupDetail {
  title: string;
  adminNickname: string;
  createDate: string;
  updateDate: string;
  coverColor: string;
  groupType: string;
}

export interface ParticipantList {
  adminId: string;
  adminNickname: string;
  nicknameList: string[];
}

export interface CoverGroupInfo {
  title: string;
  coverColor: GroupColor;
  admin: string;
}
