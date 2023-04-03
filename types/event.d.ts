type ServerPaymentType = 'non' | 'con' | 'full';

export type PaymentType = '미납' | '확인필요' | '완납' | '' | ServerPaymentType;

export interface PayMentTpyeCountMap {
  con?: number;
  non?: number;
  full?: number;
}

export interface EventInfo {
  eventId: number;
  userId: number;
  payment: number;
  userName: string;
  groundsDate: string;
  grounds: string;
  paymentType: PaymentType;
}

export interface EventInfoList {
  total: number;
  list: EventInfo[];
}

export interface EvnetId {
  eventId: number;
}

export interface EventFilter {
  year: number;
  month: number;
  week: number;
  day: number;
  userId: number;
  paymentType: PaymentType;
  today: boolean;
}

export interface MonthStatus {
  day: number;
  paymentTypeCountMap: PayMentTpyeCountMap;
}
