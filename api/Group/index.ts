import { ServerResponse } from '@/types/serverResponse';
import { GroupDetail, GroupId, GroupInfo, GroupListWithIndex, GroupNickname, ParticipantList } from '@/types/group';
import api from '..';

export const createGroup = async (newGroupInfo: GroupInfo): Promise<ServerResponse<GroupId>> => {
  const { data } = await api.post('/api/group', newGroupInfo);
  return data;
};

export const getGroupDetail = async (groupId: GroupId): Promise<ServerResponse<GroupDetail>> => {
  const { data } = await api.get(`/api/group/${groupId.groupId}`);
  return data;
};

export const getGroupList = async (pageParam: number): Promise<ServerResponse<GroupListWithIndex>> => {
  const { data } = await api.get(`api/groups?index=${pageParam}`);
  return { ...data, nextPage: pageParam + 1 };
};

export const getParticipantList = async (groupId: GroupId): Promise<ServerResponse<ParticipantList>> => {
  const { data } = await api.get(`/api/group/${groupId.groupId}/participants`);
  return data;
};

export const updateGroup = async (updateGroupInfo: Omit<GroupInfo, 'nickname'> & GroupId): Promise<ServerResponse<GroupId>> => {
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
  const { data } = await api.patch(`/api/group/admin/${groupId}`, { nickname });
  return data;
};

export const withdrawalGroup = async (groupId: GroupId): Promise<ServerResponse> => {
  const { data } = await api.delete(`/api/group/${groupId.groupId}`);
  return data;
};

export const changeNickname = async (info: GroupNickname & GroupId): Promise<ServerResponse> => {
  const { nickname, groupId } = info;
  const { data } = await api.patch(`/api/group/${groupId}/participant`, { nickname });
  return data;
};

export const getMyNickname = async (groupId: GroupId): Promise<ServerResponse<GroupNickname>> => {
  const { data } = await api.get(`/api/group/${groupId.groupId}/participant`);
  return data;
};
