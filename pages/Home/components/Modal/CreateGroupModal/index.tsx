import React, { FC, useEffect, useState } from 'react';
import Button from '../../../../../common/Button';
import Modal from '../../../../../common/Modal';
import { GroupColorList } from '../GroupColorList';
import { Label } from '../../../../../common/Label';
import * as Style from './style';
import { Input } from '../../../../../common/Input';
import { DropBox } from '../DropBox';
import { isValid } from '../../../../../utils/validation';
import { Theme } from '@emotion/react';
import { PLACEHOLDER } from '../../../../../constants';

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export interface FormData {
  groupName: string;
  myName: string;
  type: string;
  color: GroupColor;
}

export type GroupColor = keyof Theme['cover'];

export const CreateGroupModal: FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const colors: GroupColor[] = ['red', 'orange', 'yellow', 'blue', 'purple'];

  const [groupName, setGroupName] = useState('');
  const [myName, setMyName] = useState('');

  const [isInit, setIsInit] = useState({
    groupName: true,
    myName: true,
  });

  const [type, setType] = useState('');
  const [color, setColor] = useState<GroupColor>('red');

  useEffect(() => {
    if (groupName !== '' && isInit.groupName === true) setIsInit((prev) => ({ ...prev, groupName: false }));
    if (myName !== '' && isInit.myName === true) setIsInit((prev) => ({ ...prev, myName: false }));
  }, [groupName, myName]);

  const isValidForm = (): boolean => {
    if (!isValid(groupName)) return false;
    if (!isValid(myName)) return false;
    if (type === '') return false;
    if (!colors.includes(color)) return false;
    return true;
  };

  const dropDownList = [
    { title: '학교, 교내/외 모임' },
    { title: '회사, 사내 모임' },
    { title: '취미, 동호회 모임' },
    { title: '친구, 사모임' },
    { title: '프로젝트' },
    { title: '기타' },
  ];

  return (
    <Modal.Frame isOpen={isOpen} width="448px" height="446px">
      <Modal.Header onClick={setIsOpen}>
        <Style.Title>모임 만들기</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Label title="모임 이름">
          <Input placeholder={PLACEHOLDER.GROUP} value={groupName} isValid={isInit.groupName || isValid(groupName)} onChange={setGroupName} maxLength={10} />
        </Label>
        <Label title="내 이름">
          <Input placeholder={PLACEHOLDER.NAME} value={myName} isValid={isInit.myName || isValid(myName)} onChange={setMyName} maxLength={20} />
        </Label>
        <div style={{ position: 'relative' }}>
          <Label title="모임 유형">
            <DropBox dropDownList={dropDownList} type={type} setType={setType} />
          </Label>
        </div>
        <Label title="커버 색상">
          <GroupColorList value={color} onChange={setColor} />
        </Label>
      </Modal.Body>
      <Modal.Footer>
        <Button width="100%" height="42px" color={isValidForm() ? 'primary' : 'disabled'}>
          만들기
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
