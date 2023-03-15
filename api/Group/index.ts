import { ServerResponse } from '@/types/serverResponse';
import { GroupDetail, GroupId, GroupInfo, GroupListWithIndex, GroupNickname, ParticipantList } from '@/types/group';
import api from '..';
import { QueryFunctionContext } from '@tanstack/react-query';

export const createGroup = async (newGroupInfo: GroupInfo): Promise<ServerResponse<GroupId>> => {
  const { data } = await api.post('/api/group', newGroupInfo);
  return data;
};

export const getGroupDetail = async (group_id: string): Promise<ServerResponse<GroupDetail>> => {
  const { data } = await api.get(`/api/group/${group_id}`);
  return data;
};

export const getGroupList = async (index: number): Promise<ServerResponse<GroupListWithIndex>> => {
  const { data } = await api.get(`/api/groups?index=${index}`);
  return data;
};

export const getParticipantList = async (group_id: string): Promise<ServerResponse<ParticipantList>> => {
  const { data } = await api.get(`/api/group/${group_id}/participant`);
  return data;
};

export const updateGroup = async (updateGroupInfo: GroupInfo & GroupId): Promise<ServerResponse<GroupId>> => {
  const { groupId, ...groupInfo } = updateGroupInfo;
  const { data } = await api.put(`/api/group/${groupId}`, groupInfo);
  return data;
};

export const deleteGroup = async (group_id: string): Promise<ServerResponse> => {
  const { data } = await api.delete(`/api/group/${group_id}`);
  return data;
};

export const joinGroup = async (info: GroupNickname & GroupId): Promise<ServerResponse> => {
  const { nickname, groupId } = info;
  const { data } = await api.post(`/api/group/${groupId}/participant`, { nickname });
  return data;
};

export const changeAdmin = async (info: GroupNickname & GroupId): Promise<ServerResponse> => {
  const { nickname, groupId } = info;
  const { data } = await api.patch(`/api/group/admin/${groupId}`, { nickname });
  return data;
};

export const withdrawalGroup = async (groupId: string): Promise<ServerResponse> => {
  const { data } = await api.delete(`/api/group/${groupId}`);
  return data;
};

export const changeNickname = async (info: GroupNickname & GroupId): Promise<ServerResponse> => {
  const { nickname, groupId } = info;
  const { data } = await api.patch(`/api/participant/${groupId}`, { nickname });
  return data;
};
