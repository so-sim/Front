import * as Style from './style';
import { FC, useEffect, useState } from 'react';
import Button from '@/common/Button';
import Modal from '@/common/Modal';
import { GroupColorList } from '../GroupColorList';
import { Input, Label } from '@/common';
import { DropBox } from '../../DropBox';
import { isValid } from '@/utils/validation';
import { COLORS, DROPDOWN_LIST, PLACEHOLDER } from '@/constants';
import { useCreateGroup } from '@/queries/Group';
import { GroupColor } from '@/types/group';

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const CreateGroupModal: FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [groupName, setGroupName] = useState('');
  const [myName, setMyName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState<GroupColor>('#f86565');
  const [isInit, setIsInit] = useState({
    groupName: true,
    myName: true,
  });

  useEffect(() => {
    if (groupName !== '' && isInit.groupName === true) setIsInit((prev) => ({ ...prev, groupName: false }));
    if (myName !== '' && isInit.myName === true) setIsInit((prev) => ({ ...prev, myName: false }));
  }, [groupName, myName]);

  const { mutate } = useCreateGroup();

  const createGroup = () => mutate({ title: groupName, type, coverColor: color });

  const isValidForm = (): boolean => {
    if (!isValid(groupName)) return false;
    if (!isValid(myName)) return false;
    if (type === '') return false;
    if (!COLORS.includes(color)) return false;
    return true;
  };

  return (
    <Modal.Frame isOpen={isOpen} onClick={setIsOpen} width="448px" height="446px">
      <Modal.Header onClick={setIsOpen}>
        <Style.Title>모임 만들기</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Label title="모임 이름">
          <Input placeholder={PLACEHOLDER.GROUP} value={groupName} isValid={isInit.groupName || isValid(groupName)} onChange={setGroupName} maxLength={15} />
        </Label>
        <Label title="내 이름">
          <Input placeholder={PLACEHOLDER.NAME} value={myName} isValid={isInit.myName || isValid(myName)} onChange={setMyName} maxLength={15} />
        </Label>
        <div style={{ position: 'relative' }}>
          <Label title="모임 유형">
            <DropBox dropDownList={DROPDOWN_LIST} type={type} setType={setType} color="gray" />
          </Label>
        </div>
        <Label title="커버 색상">
          <GroupColorList value={color} onChange={setColor} />
        </Label>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={createGroup} width="100%" height="42px" color={isValidForm() ? 'primary' : 'disabled'}>
          만들기
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
