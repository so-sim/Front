export interface DetailInfo {
  userName: string;
  groundsDate: string;
  payment: number;
  grounds: string;
  paymentType: string;
}

export type DataWithEventId<T = null> = T & {
  eventId: string;
};

export type DetailWithEventId = DataWithEventId<DetailInfo>;

export type DetailStatusWithEventId = DataWithEventId<Pick<DetailInfo, 'paymentType'>>;
