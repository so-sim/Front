import React, { FC, useState } from 'react';
import Button from '../../../../../common/Button';
import Modal from '../../../../../common/Modal';
import theme from '../../../../../styles/Theme';
import { GroupColorList } from '../GroupColorList';
import { Label } from '../../../../../common/Label';
import * as Style from './style';
import { Input } from '../../../../../common/Input';

interface GroupModalProps {
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

export const CreateGroupModal: FC<GroupModalProps> = ({ isOpen, setIsOpen }) => {
  const colors: GroupColor[] = ['red', 'orange', 'yellow', 'blue', 'purple'];

  const [form, setForm] = useState<FormData>({
    groupName: '',
    myName: '',
    type: 'ㅇㅇ',
    color: 'red',
  });

  const changeFormData = <T extends FormData, K extends keyof T>(value: T[K], type: K) => {
    setForm((prev) => ({ ...prev, [type]: value }));
  };

  const isValid = (text: string, min: number = 2, max: number = 10): boolean => {
    const regExp = new RegExp(`^[a-zA-Z가-힣]{${min},${max}}$`);
    return regExp.test(text);
  };

  const isValidForm = (form: FormData): boolean => {
    if (!isValid(form.groupName, 2, 10)) return false;
    if (!isValid(form.myName, 2, 20)) return false;
    if (form.type === '') return false;
    if (!colors.includes(form.color)) return false;
    return true;
  };

  return (
    <Modal.Frame isOpen={true} width="448px" height="446px">
      <Modal.Header onClick={setIsOpen}>
        <Style.Title>모임 만들기</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Label title="모임 이름">
          <Input value={form} type="groupName" isValid={isValid(form.groupName, 2, 10)} onChange={setForm} maxLength={10} />
        </Label>
        <Label title="내 이름">
          <Input value={form} type="myName" isValid={isValid(form.myName, 2, 20)} onChange={setForm} maxLength={20} />
        </Label>
        <Label title="커버 색상">
          <GroupColorList value={form} onChange={setForm} type="color" />
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
