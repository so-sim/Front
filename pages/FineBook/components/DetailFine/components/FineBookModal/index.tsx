import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '@/common/Button';
import { Label } from '@/common/Label';
import Modal from '@/common/Modal';
import { DropBox } from '@/common/DropBox';
import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  type?: 'update' | 'create';
}

export const FineBookModal = ({ open, setOpen, type = 'create' }: ModalProps) => {
  const [member, setMember] = useState('');
  const [reason, setReason] = useState('');

  const [fine, setFine] = useState('');

  const isAllowedKey = (key: string): boolean => {
    const allowedKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Enter', 'Tab'];
    if (allowedKey.includes(key)) return true;
    return false;
  };

  const onChangeFine = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isAllowedKey(e.key))
      setFine((prev) => {
        if (!isNaN(Number(e.key))) return prev + e.key;
        if (e.key === 'Backspace') return prev.slice(0, -1);
        return prev;
      });
  };

  const onChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 65) return;

    setReason(e.target.value);
  };

  const memberList = [
    { title: '안녕하세요안녕하세요안녕하세요안녕하세요' },
    { title: '안녕하세요안녕하세요안녕하세요안녕하세요' },
    { title: '안녕하세요안녕하세요안녕하세요안녕하세요' },
    { title: '안녕하세요안녕하세요안녕하세요안녕하세요' },
  ];

  const status = [{ title: '미납' }, { title: '완납' }, { title: '확인 필요' }];

  return (
    <Modal.Frame width="448px" height={type === 'create' ? '466px' : '412px'} isOpen={open} onClick={() => setOpen(false)}>
      <Modal.Header onClick={() => setOpen(false)}>{type === 'create' ? '내역 추가하기' : '상세 내역 수정'}</Modal.Header>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Style.Row>
          <Label title="팀원" width="32px">
            <DropBox width={304} setType={setMember} type={member} dropDownList={memberList} />
          </Label>
          <Label title="납부여부" width="64px">
            <DropBox color="white" boxWidth="112px" width={112} setType={setMember} type={member} dropDownList={status} />
          </Label>
        </Style.Row>
        <Style.Row>
          <Label title="금액" width="32px">
            <Style.Input type="string" value={changeNumberToMoney(Number(fine))} onKeyDown={onChangeFine} style={{ height: '32px' }} />
          </Label>
          <Label title="날짜" width="32px">
            <DropBox color="white" boxWidth="138px" width={138} setType={setMember} type={member} dropDownList={memberList} />
          </Label>
        </Style.Row>
        <Label title="사유" width="32px">
          <Style.TextArea maxLength={65} onChange={onChangeReason} placeholder="내용을 입력해주세요.">
            {reason}
          </Style.TextArea>
          <Style.Length>{reason.length}/65</Style.Length>
        </Label>
        <Modal.Footer flexDirection="column">
          <Button color="black" width="100%" height="42px">
            저장하기
          </Button>
          {type === 'create' && (
            <Button color="white" width="100%" height="42px" leftIcon={SYSTEM.PLUS_GRAY}>
              계속해서 추가하기
            </Button>
          )}
        </Modal.Footer>
      </div>
    </Modal.Frame>
  );
};
