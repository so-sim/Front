import { DropBox, Input, Label } from '@/components/@common';
import { GroupColorList } from '@/components/@common/GroupColorList';
import { DROPDOWN_LIST } from '@/constants/Group';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useDeleteGroup, useGroupDetail, useWithdrawalGroup } from '@/queries/Group';
import React, { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { GroupFormData } from '..';
import * as Style from '../styles';

type Props = {
  groupForm: GroupFormData;
  setGroupForm: Dispatch<SetStateAction<GroupFormData>>;
  isError: { nickname: string; groupName: string };
  setError: (target: 'nickname' | 'groupName', message: string) => string;
};

const GroupForm = ({ groupForm, setGroupForm, isError, setError }: Props) => {
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const { groupId } = useParams();

  const { data: groupData } = useGroupDetail(Number(groupId));

  const handleGroupFormData = <K extends keyof GroupFormData>(type: K, value: GroupFormData[K]) => {
    setGroupForm((prev) => ({ ...prev, [type]: value }));
  };

  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();
  const { mutate: deleteGroup } = useDeleteGroup();

  const hasMoreUser = groupData?.content.size && groupData?.content.size > 1;
  const hasNoUser = groupData?.content.size && groupData?.content.size <= 1;

  const onDeleteGroup = () => {
    deleteGroup({ groupId: Number(groupId) });
  };

  const withdrwalGroup = () => {
    const id = Number(groupId);
    withdrawalGroupMutate({ groupId: id });
  };

  const handleGroupDeleteModal = () => {
    if (hasMoreUser) {
      openConfirmModal({
        type: 'GROUP_DELETE_HAS_USER',
        confirm: closeConfirmModal,
      });
    }

    if (hasNoUser) {
      openConfirmModal({
        type: 'GROUP_DELETE_NO_USER',
        confirm: onDeleteGroup,
        cancel: closeConfirmModal,
      });
    }
  };

  const handleGroupWithdrawalModal = () => {
    if (hasMoreUser) {
      openConfirmModal({
        type: 'GROUP_WITHDRAWAL_ADMIN_HAS_USER',
        confirm: closeConfirmModal,
      });
    }

    if (hasNoUser) {
      openConfirmModal({
        type: 'GROUP_WITHDRAWAL_ADMIN_NO_USER',
        confirm: withdrwalGroup,
        cancel: closeConfirmModal,
      });
    }
  };

  return (
    <Style.Container>
      <div style={{ width: '100%' }}>
        <Label title="모임 이름" flexDirection="column">
          <Input
            value={groupForm.title}
            errorText={isError.groupName}
            onChange={(value) => handleGroupFormData('title', value)}
            maxLength={15}
            setError={setError}
            title="groupName"
          />
        </Label>
        <Label title="내 이름" flexDirection="column">
          <Input
            value={groupForm.nickname}
            errorText={isError.nickname}
            onChange={(value) => handleGroupFormData('nickname', value)}
            maxLength={15}
            setError={setError}
            title="nickname"
          />
        </Label>
        <Label title="모임 유형" flexDirection="column">
          <DropBox
            dropDownList={DROPDOWN_LIST}
            type={groupForm.type} //
            setType={(value) => handleGroupFormData('type', value)}
            boxWidth="170px"
            width={170}
          />
        </Label>
        <Label title="커버 색상" flexDirection="column" margin="0px">
          <GroupColorList selectedColor={groupForm.coverColor} onChange={(value) => handleGroupFormData('coverColor', value)} />
        </Label>
      </div>
      <div style={{ width: '100%' }}>
        <Label title="모임 탈퇴" flexDirection="column" />
        <Style.WithDrwal>
          <Style.GroupName>{groupData?.content.title}</Style.GroupName>
          <Style.QuitButton onClick={handleGroupWithdrawalModal}>탈퇴</Style.QuitButton>
        </Style.WithDrwal>
        <Style.Flex>
          <Style.DeleteButton onClick={handleGroupDeleteModal}>모임 삭제</Style.DeleteButton>
        </Style.Flex>
      </div>
    </Style.Container>
  );
};

export default GroupForm;
