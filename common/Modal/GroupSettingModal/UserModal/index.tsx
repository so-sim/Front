import React, { FC, useEffect, useState } from 'react';
import Button from '@/common/Button';
import { Input } from '@/common/Input';
import { Label } from '@/common/Label';
import Modal from '@/common/Modal';
import { useError } from '@/utils/validation';
import * as Style from './styles';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useParams } from 'react-router-dom';
import { useChangeNickname, useGroupDetail, useWithdrawalGroup } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import { TwoButtonModal } from '../../TwoButtonModal';
import { GROUP_WITHDRWWAL_USER } from '@/constants/GroupWithdrawal';

export const UserModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  const [myName, setMyName] = useState('');
  const [showGroupWithdrawalModal, setShowGroupWithdrawalModal] = useState(false);
  const { groupId } = useParams();

  const [isError, setError] = useError({
    nickname: '',
  });

  const { mutate: updateNickname } = useChangeNickname({ setError, modalHandler });
  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();
  const { data: groupData } = useGroupDetail({ groupId: Number(groupId) });
  const { data: myNickname } = useGetMyNikname({ groupId: Number(groupId) });

  const withdrwalGroup = () => {
    const id = Number(groupId);
    withdrawalGroupMutate({ groupId: id });
  };

  const handleGroupWithdrawalModal = () => {
    setShowGroupWithdrawalModal((prev) => !prev);
  };

  const updateMyNickname = () => {
    const id = Number(groupId);
    !isError.nickname && updateNickname({ groupId: id, nickname: myName });
  };

  useEffect(() => {
    if (!myNickname) return;
    setMyName(myNickname.content.nickname);
  }, [myNickname?.content.nickname]);

  return (
    <>
      <Modal.Frame onClick={modalHandler} width="492px" height="380px">
        <Modal.Header onClick={modalHandler}>
          <Style.Title>모임 설정</Style.Title>
        </Modal.Header>
        <Modal.Body>
          <Style.Flex>
            <Style.SubTitle>사용자 설정</Style.SubTitle>
            <Style.InputContainer>
              <Label title="내 이름" flexDirection="column">
                <Input value={myName} errorText={isError.nickname} onChange={setMyName} maxLength={20} setError={setError} title="nickname" />
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
      {showGroupWithdrawalModal && (
        <TwoButtonModal
          width="448px"
          height="265px"
          onClick={handleGroupWithdrawalModal}
          title={GROUP_WITHDRWWAL_USER.titel}
          description={GROUP_WITHDRWWAL_USER.desc}
          cancel={{ text: '취소', onClick: handleGroupWithdrawalModal }}
          confirm={{ text: '모임 탈퇴', onClick: withdrwalGroup }}
        />
      )}
    </>
  );
};
