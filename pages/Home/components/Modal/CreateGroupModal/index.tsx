import React, { FC, useState } from 'react';
import Button from '../../../../../common/Button';
import Modal from '../../../../../common/Modal';
import theme from '../../../../../styles/Theme';
import { GroupColorList } from '../GroupColorList';
import { Label } from '../../../../../common/Label';
import * as Style from './style';
import { Input } from '../../../../../common/Input';
import { ARROW } from '../../../../../assets/icons/Arrow';
import { DropBox } from '../DropBox';
import { isValid } from '../../../../../utils/validation';

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

export type GroupColor = 'red' | 'orange' | 'yellow' | 'blue' | 'purple';

export const CreateGroupModal: FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const colors: GroupColor[] = ['red', 'orange', 'yellow', 'blue', 'purple'];

  const [form, setForm] = useState<FormData>({
    groupName: '',
    myName: '',
    type: '',
    color: 'red',
  });

  const changeFormData = <T extends FormData, K extends keyof T>(value: T[K], type: K) => {
    setForm((prev) => ({ ...prev, [type]: value }));
  };

  const isValidForm = (form: FormData): boolean => {
    if (!isValid(form.groupName, 2, 10)) return false;
    if (!isValid(form.myName, 2, 20)) return false;
    if (form.type === '') return false;
    if (!colors.includes(form.color)) return false;
    return true;
  };

  const [groupName, setGroupName] = useState('');
  const [myName, setMyName] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('red');

  const [openDrop, setOpenDrop] = useState(false);

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
          <Input value={groupName} isValid={isValid(groupName, 2, 10)} onChange={setGroupName} maxLength={10} />
        </Label>
        <Label title="내 이름">
          <Input value={myName} isValid={isValid(myName, 2, 20)} onChange={setMyName} maxLength={20} />
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
        <div style={{ height: '12px' }} />
        <Button width="100%" height="42px" color={isValidForm(form) ? 'primary' : 'disabled'}>
          만들기
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
