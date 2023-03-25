import React, { FC, useEffect, useState } from 'react';
import Button from '@/common/Button';
import { Input } from '@/common/Input';
import { Label } from '@/common/Label';
import Modal from '@/common/Modal';
import { isValid } from '@/utils/validation';
import * as Style from './styles';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useParams } from 'react-router-dom';
import { useChangeNickname, useGroupDetail, useWithdrawalGroup } from '@/queries/Group';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';

export const UserModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  const [myName, setMyName] = useState('');
  const { groupId } = useParams();

  const { mutate: updateNickname } = useChangeNickname();
  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();
  const { data: groupData } = useGroupDetail({ groupId: Number(groupId) });
  const { data: myNickname } = useGetMyNikname({ groupId: Number(groupId) });

  const withdrwalGroup = () => {
    const id = Number(groupId);
    withdrawalGroupMutate({ groupId: id });
  };

  const updateMyNickname = () => {
    const id = Number(groupId);
    updateNickname({ groupId: id, nickname: myName });
    modalHandler();
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
              <Input value={myName} isValid={isValid(myName, 2, 20)} onChange={setMyName} maxLength={20} />
            </Label>
            <Label title="모임 탈퇴" flexDirection="column">
              <Style.WithDrwal>
                <Style.GroupName>{groupData?.content.title}</Style.GroupName>
                <Style.QuitButton onClick={withdrwalGroup}>탈퇴</Style.QuitButton>
              </Style.WithDrwal>
            </Label>
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
