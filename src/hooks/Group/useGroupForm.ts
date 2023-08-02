import useFormState from '../Shared/useFormState';
import { COLORS } from '@/constants/Group';
import { checkCountChar, useError } from '@/utils/validation';
import { GroupFormData } from '@/components/@common/Modal/GroupSettingModal/AdminModal';
import { useCreateGroup, useDeleteGroup, useGroupDetail, useUpdateGroup, useWithdrawalGroup } from '@/queries/Group';
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
  createGroup: () => Promise<ServerResponse<GroupId>>;
  updateGroupForm: () => Promise<ServerResponse<GroupId>>;
  deleteGroup: () => void;
  withdrwalGroup: () => void;
  hasUser: () => boolean;
  handleGroupFormData: (type: keyof GroupFormData, value: GroupFormData[keyof GroupFormData]) => void;
};

export type GroupFormHook = {
  groupForm: GroupFormData;
  groupInfoLoading: boolean;
  createGroupLoading: boolean;
  isValidGroupForm: boolean;
  isError: { nickname: string; groupName: string };
  getGroupFormAction: () => GroupFormAction;
  setError: (target: 'nickname' | 'groupName', message: string) => string;
};

const useGroupForm = (): GroupFormHook => {
  const { groupId } = useParams();

  const { formState, isValid, setFormState } = useFormState<GroupFormData>(initialValue, isValidGroupForm);
  const [isError, setError] = useError({
    nickname: '',
    groupName: '',
  });

  const { data: groupData } = useGroupDetail(Number(groupId));
  const { mutateAsync: updateGroupMutate, isLoading: groupInfoLoading } = useUpdateGroup({ setError });
  const { mutateAsync: createGroupMutate, isLoading: createGroupLoading } = useCreateGroup();

  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();
  const { mutate: deleteGroupMutate } = useDeleteGroup();

  const handleGroupFormData = <K extends keyof GroupFormData>(type: K, value: GroupFormData[K]) => {
    setFormState((prev) => ({ ...prev, [type]: value }));
  };

  const hasUser = (): boolean => {
    if (groupData?.content.size) {
      return groupData?.content.size > 1 ? true : false;
    }
    return false;
  };

  const createGroup = () => {
    if (isValidGroupForm(formState)) {
      return createGroupMutate(formState);
    }
    throw new Error('올바른 형식이 아닙니다.');
  };

  const updateGroupForm = () => {
    return updateGroupMutate({ groupId: Number(groupId), ...formState });
  };

  const deleteGroup = () => {
    deleteGroupMutate({ groupId: Number(groupId) });
  };

  const withdrwalGroup = () => {
    withdrawalGroupMutate({ groupId: Number(groupId) });
  };

  const getGroupFormAction = (): GroupFormAction => {
    return {
      createGroup,
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
    setFormState({ title, coverColor, type, nickname: adminNickname });
  }, [groupData]);

  return {
    groupInfoLoading,
    createGroupLoading,
    groupForm: formState,
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
