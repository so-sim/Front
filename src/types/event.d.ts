export interface PayMentTpyeCountMap {
  확인중: number;
  미납: number;
  완납: number;
}

export type EvnetId = {
  eventId: number;
};

export interface MonthStatus {
  statusOfDay: { [key in number]: PayMentTpyeCountMap };
}

export type Ground = '지각' | '결석' | '과제 안 함' | '기타';
export type Situation = '미납' | '완납' | '확인중';

export type EventInfoTest = {
  eventId: number;
  groupId: number;
  nickname: string;
  date: string;
  amount: number;
  ground: Ground;
  memo: string;
  situation: Situation;
};

export type SelectedEventInfo = Omit<EventInfoTest, 'groupId'>;

export type EventInfoListTest = {
  totalCount: number;
  eventList: SelectedEventInfo[];
};
