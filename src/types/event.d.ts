export interface PayMentTpyeCountMap {
  con?: number;
  non?: number;
  full?: number;
}

//삭제 예정
export interface EventInfo {
  // paymentType: ServerPaymentType;
}

export type EvnetId = {
  eventId: number;
};

export interface MonthStatus {
  day: number;
  paymentTypeCountMap: PayMentTpyeCountMap;
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
