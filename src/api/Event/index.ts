import { SelectedEventInfo } from '@/types/event';
import { EvnetId, MonthStatus, EventInfoTest, EventInfoListTest } from '@/types/event';
import { GroupId } from '@/types/group';
import { ServerResponse } from '@/types/serverResponse';
import api from '..';

export const createEvent = async (detailInfo: Omit<EventInfoTest, 'eventId'>): Promise<ServerResponse<EvnetId>> => {
  const { data } = await api.post('/api/event/penalty', detailInfo);
  return data;
};

export const getOneOfEvent = async (eventId?: number): Promise<ServerResponse<Omit<EventInfoTest, 'groupId'>>> => {
  const { data } = await api.get(`/api/event/penalty/${eventId}`);
  return data;
};

export const getEventList = async (query: string, groupId: GroupId): Promise<ServerResponse<EventInfoListTest>> => {
  const { data } = await api.get(`/api/event/penalty/list/${groupId.groupId}?${query}`);
  return data;
};

export const updateEvent = async (info: SelectedEventInfo): Promise<ServerResponse<EventInfoTest>> => {
  const { eventId, ...detailInfo } = info;
  const { data } = await api.post(`/api/event/penalty/${eventId}`, detailInfo);
  return data;
};

export const deleteEvent = async (eventId: number): Promise<ServerResponse<EvnetId>> => {
  const { data } = await api.put(`/api/event/penalty/${eventId}`);
  return data;
};

export const updateEventStatus = async (info: Pick<EventInfoTest, 'eventId' | 'situation'>): Promise<ServerResponse<EventInfoTest>> => {
  const { eventId, situation } = info;
  const { data } = await api.patch(`/api/event/penalty/${String(eventId)}`, { situation });
  return data;
};

export const getMonthStatus = async (groupId: string | undefined, year: string, month: string): Promise<ServerResponse<MonthStatus[]>> => {
  const { data } = await api.get(`/api/event/penalty/mstatus/${groupId}?year=${year}&month=${month}`);
  return data;
};
