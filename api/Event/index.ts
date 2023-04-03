import { EventInfo, EvnetId, EventInfoList, MonthStatus } from '@/types/event';
import { GroupId } from '@/types/group';
import { ServerResponse } from '@/types/serverResponse';
import api from '..';

export const createEvent = async (detailInfo: Omit<EventInfo, 'eventId'>): Promise<ServerResponse<EvnetId>> => {
  const { data } = await api.post('/api/event/penalty', detailInfo);
  return data;
};

export const getOneOfEvent = async (eventId?: number): Promise<ServerResponse<Omit<EventInfo, 'eventId' | 'userId'>>> => {
  const { data } = await api.get(`/api/event/penalty/${eventId}`);
  return data;
};

export const getEventList = async (query: string, groupId: GroupId): Promise<ServerResponse<EventInfoList>> => {
  const { data } = await api.get(`/api/event/penalty/list/${groupId.groupId}?${query}`);
  return data;
};

export const updateEvent = async (info: EventInfo & EvnetId): Promise<ServerResponse<EventInfo>> => {
  const { eventId, ...detailInfo } = info;
  const { data } = await api.post(`/api/event/penalty/${eventId}`, detailInfo);
  return data;
};

export const deleteEvent = async (eventId: string): Promise<ServerResponse<EvnetId>> => {
  const { data } = await api.put(`/api/event/penalty/${eventId}`);
  return data;
};

export const updateEventStatus = async (info: EvnetId & Pick<EventInfo, 'paymentType'>): Promise<ServerResponse<EventInfo>> => {
  const { eventId, paymentType } = info;
  const { data } = await api.patch(`/api/event/penalty/${String(eventId)}`, { paymentType });
  return data;
};

export const getMonthStatus = async (groupId: string | undefined, year: string, month: string): Promise<ServerResponse<MonthStatus[]>> => {
  const { data } = await api.get(`/api/event/penalty/mstatus/${groupId}?year=${year}&month=${month}`);
  return data;
};
