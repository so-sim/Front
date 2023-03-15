import React, { FC, useState } from 'react';
import Button from '@/common/Button';
import { Input } from '@/common/Input';
import { Label } from '@/common/Label';
import Modal from '@/common/Modal';
import { isValid } from '@/utils/validation';
import * as Style from './style';
import { ModalHandlerProps } from '../../CreateGroupModal';
import { useParams } from 'react-router-dom';
import { useWithdrawalGroup } from '@/queries/Group';

export const UserModal: FC<ModalHandlerProps> = ({ isOpen, modalHandler }) => {
  const [myName, setMyName] = useState('내이름');
  const { groupId } = useParams();

  const { mutate: withdrawalGroupMutate } = useWithdrawalGroup();

  const withdrwalGroup = () => {
    const id = Number(groupId);
    withdrawalGroupMutate({ groupId: id });
  };

  return (
    <Modal.Frame isOpen={isOpen} onClick={modalHandler} width="492px" height="380px">
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
                <Style.GroupName>그룹네임</Style.GroupName>
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
          <Button color="black">저장</Button>
        </Style.ButtonFrame>
      </Modal.Footer>
    </Modal.Frame>
  );
};
