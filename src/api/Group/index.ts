import { ServerResponse } from '@/types/serverResponse';
import { GroupDetail, GroupId, GroupInfo, GroupListWithIndex, GroupNickname, NotificationInfo, ParticipantList, SearchedParticipantList } from '@/types/group';
import api from '..';

export const createGroup = async (newGroupInfo: GroupInfo): Promise<ServerResponse<GroupId>> => {
  const { data } = await api.post('/api/group', newGroupInfo);
  return data;
};

export const getGroupDetail = async (groupId: number | undefined): Promise<ServerResponse<GroupDetail>> => {
  const { data } = await api.get(`/api/group/${groupId}`);
  return data;
};

export const getGroupList = async (pageParam: number): Promise<ServerResponse<GroupListWithIndex>> => {
  const { data } = await api.get(`/api/groups?page=${pageParam}`);
  return data;
};

export const getParticipantList = async (groupId: number | undefined): Promise<ServerResponse<ParticipantList>> => {
  const { data } = await api.get(`/api/group/${groupId}/participants`);
  return data;
};

export const searchParticipantList = async (groupId: number | undefined, keyword: string): Promise<ServerResponse<SearchedParticipantList>> => {
  const { data } = await api.get(`/api/group/${groupId}/participants-nickname?keyword=${keyword}`);
  return data;
};

export const updateGroup = async (updateGroupInfo: GroupInfo & GroupId): Promise<ServerResponse<GroupId>> => {
  const { groupId, ...groupInfo } = updateGroupInfo;
  const { data } = await api.patch(`/api/group/${groupId}`, groupInfo);
  return data;
};

export const deleteGroup = async (groupId: GroupId): Promise<ServerResponse> => {
  const { data } = await api.delete(`/api/group/${groupId.groupId}`);
  return data;
};

export const joinGroup = async (info: GroupNickname & GroupId): Promise<ServerResponse> => {
  const { nickname, groupId } = info;
  const { data } = await api.post(`/api/group/${groupId}/participant`, { nickname });
  return data;
};

export const changeAdmin = async (info: GroupNickname & GroupId): Promise<ServerResponse> => {
  const { nickname, groupId } = info;
  const { data } = await api.patch(`/api/group/${groupId}/admin`, { nickname });
  return data;
};

export const withdrawalGroup = async (groupId: GroupId): Promise<ServerResponse> => {
  const { data } = await api.delete(`/api/group/${groupId.groupId}/participant`);
  return data;
};

export const changeNickname = async (info: GroupNickname & GroupId): Promise<ServerResponse> => {
  const { nickname, groupId } = info;
  const { data } = await api.patch(`/api/group/${groupId}/participant`, { nickname });
  return data;
};

export const getMyNickname = async (groupId: number | undefined): Promise<ServerResponse<GroupNickname>> => {
  const { data } = await api.get(`/api/group/${groupId}/participant`);
  return data;
};

export const getNotificationInfo = async (groupId: number | undefined): Promise<ServerResponse<NotificationInfo>> => {
  const { data } = await api.get(`/api/group/${groupId}/notification-info`);
  return data;
};

export const updateNotificationInfo = async (groupId: number | undefined, notificationInfo: NotificationInfo): Promise<ServerResponse> => {
  const { data } = await api.put(`/api/group/${groupId}/notification-info`, { ...notificationInfo });
  return data;
};
