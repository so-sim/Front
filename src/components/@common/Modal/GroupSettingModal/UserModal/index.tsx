import React, { FC, useEffect, useState } from 'react';
import Button from '@/components/@common/Button';
import { Input, Label } from '@/components/@common';
import Modal from '@/components/@common/Modal';
import { useError } from '@/utils/validation';
import * as Style from './styles';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useParams } from 'react-router-dom';
import { useChangeNickname, useGroupDetail, useWithdrawalGroup } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useWithdrawalParticipantList } from '@/queries/Group/useWithdrawalParticipantList';

export const UserModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  const [myName, setMyName] = useState('');
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const { groupId } = useParams();

  const [isError, setError] = useError({
    nickname: '',
  });

  const { mutate: updateNickname } = useChangeNickname({ setError, modalHandler });
  const { isWithdrawal } = useWithdrawalParticipantList(Number(groupId));

  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();
  const { data: groupData } = useGroupDetail(Number(groupId));
  const { data: myNickname } = useGetMyNikname(Number(groupId));

  const withdrwalGroup = () => {
    const id = Number(groupId);
    withdrawalGroupMutate({ groupId: id });
  };

  const handleGroupWithdrawalModal = () => {
    openConfirmModal({
      type: 'GROUP_WITHDRAWAL_USER',
      confirm: withdrwalGroup,
      cancel: closeConfirmModal,
    });
  };

  const updateMyNickname = () => {
    const id = Number(groupId);
    if (isWithdrawal(myName)) {
      setError('nickname', '탈퇴 이력이 존재한 닉네임으로 변경 불가능 합니다.');
      return;
    }
    !isError.nickname && updateNickname({ groupId: id, nickname: myName });
  };

  useEffect(() => {
    if (!myNickname) return;
    setMyName(myNickname.content.nickname);
  }, [myNickname?.content.nickname]);

  return (
    <Modal.Frame onClick={modalHandler} width="492px" height="380px">
      <Modal.Header onClick={modalHandler}>
        <Style.Title>모임 설정</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Style.Flex>
          <Style.SubTitle>사용자 설정</Style.SubTitle>
          <Style.InputContainer>
            <Label title="내 이름" flexDirection="column">
              <Input value={myName} errorText={isError.nickname} onChange={setMyName} maxLength={15} setError={setError} title="nickname" />
            </Label>
            <Label title="모임 탈퇴" flexDirection="column" />
            <Style.WithDrwal>
              <Style.GroupName>{groupData?.content.title}</Style.GroupName>
              <Style.QuitButton onClick={handleGroupWithdrawalModal}>탈퇴</Style.QuitButton>
            </Style.WithDrwal>
          </Style.InputContainer>
        </Style.Flex>
      </Modal.Body>
      <Modal.Footer>
        <Style.ButtonFrame>
          <Button color="white" onClick={modalHandler}>
            취소
          </Button>
          <Button color="black" onClick={updateMyNickname}>
            저장
          </Button>
        </Style.ButtonFrame>
      </Modal.Footer>
    </Modal.Frame>
  );
};
