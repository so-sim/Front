import api from '..';

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

export const createDetail = async (detailInfo: DetailInfo) => {
  const { data } = await api.post('/api/event/penalty', detailInfo);
  return data;
};

export const getOneOfDetail = async (eventId: string) => {
  const { data } = await api.get(`api/event/penalty/${eventId}`);
  return data;
};

/** 아직 미완성 */
export const getDetailList = async () => {
  const { data } = await api.get(`api/event/penalty/`);
  return data;
};

export const updateDetail = async (info: DetailWithEventId) => {
  const { eventId, ...detailInfo } = info;
  const { data } = await api.post(`/api/event/penalty/${eventId}`, detailInfo);
  return data;
};

export const updateDetailStatus = async (info: DetailStatusWithEventId) => {
  const { eventId, paymentType } = info;
  const { data } = await api.patch(`/api/event/penalty/${eventId}`, paymentType);
  return data;
};

export const deleteDetail = async (eventId: string) => {
  const { data } = await api.put(`/api/event/penalty/${eventId}`);
  return data;
};
