import React, { FC, useEffect, useState } from 'react';
import { Input, Label } from '@/common';
import Button from '@/common/Button';
import Modal from '@/common/Modal';
import theme from '@/styles/Theme';
import { isValid } from '@/utils/validation';
import { GroupColorList } from '../GroupColorList';
import { DropBox } from '../DropBox';
import { QuitGroup } from '../QuitGroup';
import * as Style from './style';
import { COLORS, DROPDOWN_LIST, GroupColor } from '@/constants';
import { ModalProps } from '../CreateGroupModal';

export const AdminModal: FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [groupName, setGroupName] = useState('');
  const [myName, setMyName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState<GroupColor>('red');

  const [isInit, setIsInit] = useState({
    groupName: true,
    myName: true,
  });

  useEffect(() => {
    if (groupName !== '' && isInit.groupName === true) setIsInit((prev) => ({ ...prev, groupName: false }));
    if (myName !== '' && isInit.myName === true) setIsInit((prev) => ({ ...prev, myName: false }));
  }, [groupName, myName]);

  const isValidForm = (): boolean => {
    if (!isValid(groupName)) return false;
    if (!isValid(myName)) return false;
    if (type === '') return false;
    if (!COLORS.includes(color)) return false;
    return true;
  };

  return (
    <Modal.Frame isOpen={isOpen} onClick={setIsOpen} width="492px" height="708px">
      <Modal.Header align="start" onClick={setIsOpen}>
        <Style.Title>모임 설정</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', width: '100%' }}>
          <Style.SubTitle>사용자 설정</Style.SubTitle>
          <div style={{ width: '100%', borderLeft: `2px solid ${theme.colors.neutral_400_b}`, paddingLeft: '16px' }}>
            <Label title="모임 이름" flexDirection="column">
              <Input value={groupName} isValid={isInit.groupName || isValid(groupName)} onChange={setGroupName} maxLength={15} />
            </Label>
            <Label title="내 이름" flexDirection="column">
              <Input value={myName} isValid={isInit.myName || isValid(myName)} onChange={setMyName} maxLength={15} />
            </Label>
            <Label title="모임 유형" flexDirection="column">
              <DropBox dropDownList={DROPDOWN_LIST} type={type} setType={setType} />
            </Label>
            <Label title="커버 색상" flexDirection="column">
              <GroupColorList value={color} onChange={setColor} />
            </Label>
            <Label title="모임 탈퇴" flexDirection="column">
              <QuitGroup />
            </Label>
            <div style={{ display: 'flex' }}>
              <Style.DeleteButton>모임 삭제</Style.DeleteButton>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Style.ButtonFrame>
          <Button color="white">취소</Button>
          <Button color="black">저장</Button>
        </Style.ButtonFrame>
      </Modal.Footer>
    </Modal.Frame>
  );
};
