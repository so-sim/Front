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
  adminNickname: string;
  nicknameList: string[];
}

export interface SearchedParticipantList {
  nicknameList: { nickname: string; withdraw: boolean }[];
}

export interface CoverGroupInfo {
  title: string;
  coverColor: GroupColor;
  admin: string;
}

export interface GroupList {
  groupId: number;
  title: string;
  coverColor: GroupColor;
  type: string;
  adminNickname: string;
}

export interface GroupListWithIndex {
  hasNext: boolean;
  groupList: GroupList[];
}

export type NotificationSettingType = 'M' | 'W' | 'D';
export type MonthSettingType = 'SIMPLE_DATE' | 'WEEK';
export type DayType = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export type NotificationInfo = {
  //필수 데이터
  enableNotification: boolean; //-${알림 허용 여부},
  settingType: NotificationSettingType; //매달, 매주, 매일
  repeatCycle: number; //반복주기,
  startDate: string; //시작일
  sendTime: string; // 시간설정,

  //매달일 경우
  monthSettingType?: MonthSettingType; // 날짜로 선택하기 | 요일로 선택하기

  //날짜로 선택하기일 경우
  sendDay?: number | 0; // 날짜로 선택하기일 경우, 전송하는 날짜 : => 요일로 선택하기일 경우에는 0 전송

  //요일로 선택하기일 경우
  ordinalNumbers?: number[] | null; // 몇 번째 (첫 번째, 두 번째 ...) 날짜로 선택하기일 경우 null

  daysOfWeek?: string[] | null; //-${매달 요일Type -> 요일들/매주 -> 요일들} [MONDAY, SUNDAY] => 날짜로 선택하기일 경우 null
};
