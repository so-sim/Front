import { EvnetInfo, EvnetId } from '@/types/event';
import { ServerResponse } from '@/types/serverResponse';
import api from '..';

export const createEvent = async (detailInfo: EvnetInfo): Promise<ServerResponse<EvnetId>> => {
  const { data } = await api.post('/api/event/penalty', detailInfo);
  return data;
};

export const getOneOfEvent = async (eventId: string): Promise<ServerResponse<Omit<EvnetInfo, 'eventId' | 'userId'>>> => {
  const { data } = await api.get(`api/event/penalty/${eventId}`);
  return data;
};

/** 아직 미완성 */
export const getEventList = async (): Promise<ServerResponse<EvnetInfo>> => {
  const { data } = await api.get(`api/event/penalty`);
  return data;
};

export const updateEvent = async (info: EvnetInfo & EvnetId): Promise<ServerResponse<EvnetInfo>> => {
  const { eventId, ...detailInfo } = info;
  const { data } = await api.post(`/api/event/penalty/${eventId}`, detailInfo);
  return data;
};

export const deleteEvent = async (eventId: string): Promise<ServerResponse<EvnetId>> => {
  const { data } = await api.put(`/api/event/penalty/${eventId}`);
  return data;
};

export const updateEventStatus = async (info: EvnetId & Pick<EvnetInfo, 'paymentType'>): Promise<ServerResponse<EvnetInfo>> => {
  const { eventId, paymentType } = info;
  const { data } = await api.patch(`/api/event/penalty/${eventId}`, paymentType);
  return data;
};
