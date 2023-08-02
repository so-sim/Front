import useForm from '../shared/useForm';
import { COLORS } from '@/constants/Group';
import { checkCountChar, useError } from '@/utils/validation';
import { GroupFormData } from '@/components/@common/Modal/GroupSettingModal/AdminModal';
import { useDeleteGroup, useGroupDetail, useUpdateGroup, useWithdrawalGroup } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ServerResponse } from '@/types/serverResponse';
import { GroupId } from '@/types/group';

const initialValue: GroupFormData = {
  title: '',
  nickname: '',
  type: '',
  coverColor: '#f89a65',
};

export type GroupFormAction = {
  updateGroupForm: () => Promise<ServerResponse<GroupId>>;
  deleteGroup: () => void;
  withdrwalGroup: () => void;
  handleGroupFormData: (type: keyof GroupFormData, value: GroupFormData[keyof GroupFormData]) => void;
  hasUser: () => boolean;
};

export type GroupFormHook = {
  groupForm: GroupFormData;
  isError: { nickname: string; groupName: string };
  setError: (target: 'nickname' | 'groupName', message: string) => string;
  groupInfoLoading: boolean;
  isValidGroupForm: boolean;
  getGroupFormAction: () => GroupFormAction;
};

const useGroupForm = (): GroupFormHook => {
  const { groupId } = useParams();

  const { form, isValid, setForm } = useForm<GroupFormData>(initialValue, isValidGroupForm);
  const [isError, setError] = useError({
    nickname: '',
    groupName: '',
  });

  const { data: groupData } = useGroupDetail(Number(groupId));
  const { mutateAsync: updateGroupMutate, isLoading: groupInfoLoading } = useUpdateGroup({ setError });
  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();
  const { mutate: deleteGroupMutate } = useDeleteGroup();

  const handleGroupFormData = <K extends keyof GroupFormData>(type: K, value: GroupFormData[K]) => {
    setForm((prev) => ({ ...prev, [type]: value }));
  };

  const hasUser = (): boolean => {
    if (groupData?.content.size) {
      return groupData?.content.size > 1 ? true : false;
    }
    return false;
  };

  const updateGroupForm = () => {
    return updateGroupMutate({ groupId: Number(groupId), ...form });
  };

  const deleteGroup = () => {
    deleteGroupMutate({ groupId: Number(groupId) });
  };

  const withdrwalGroup = () => {
    const id = Number(groupId);
    withdrawalGroupMutate({ groupId: id });
  };

  const getGroupFormAction = (): GroupFormAction => {
    return {
      updateGroupForm,
      deleteGroup,
      withdrwalGroup,
      hasUser,
      handleGroupFormData,
    };
  };

  useEffect(() => {
    if (!groupData) return;
    const { title, coverColor, type, adminNickname } = groupData.content;
    setForm({ title, coverColor, type, nickname: adminNickname });
  }, [groupData]);

  return {
    groupInfoLoading,
    groupForm: form,
    isError,
    isValidGroupForm: isValid,
    setError,
    getGroupFormAction,
  };
};

export default useGroupForm;

export const isValidGroupForm = (groupForm: GroupFormData) => {
  const { title, nickname, type, coverColor } = groupForm;
  if (checkCountChar(title)) return false;
  if (checkCountChar(nickname)) return false;
  if (type === '') return false;
  if (!COLORS.includes(coverColor)) return false;
  return true;
};
