type PaymentType = '미납' | '확인필요' | '완납';

export interface EvnetInfo {
  eventId: number;
  userId: number;
  userName: string;
  groundsDate: string;
  grounds: string;
  paymentType: PaymentType;
}

export interface EvnetId {
  eventId: number;
}

export interface EventFilter {
  month: number;
  week: number;
  day: number;
  userId: number;
  paymentType: 1 | 2 | 3;
  today: boolean;
}
