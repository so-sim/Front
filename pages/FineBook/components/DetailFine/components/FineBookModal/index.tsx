import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '@/common/Button';
import { Label } from '@/common/Label';
import Modal from '@/common/Modal';
import { DropBox } from '@/pages/Home/components/Modal/DropBox';
import * as Style from './styles';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const FineBookModal = ({ open, setOpen }: ModalProps) => {
  const [member, setMember] = useState('');
  const [reason, setReason] = useState('');

  const [fine, setFine] = useState('');

  const isSuitableKey = (key: string): boolean => {
    switch (key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case 'Backspace':
      case 'Enter':
      case 'Tab':
        return true;
      default:
        return false;
    }
  };

  const onChangeFine = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSuitableKey(e.key))
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
    <Modal.Frame width="448px" height="412px" isOpen={open} onClick={() => setOpen(false)}>
      <Modal.Header onClick={() => setOpen(false)}>상세 내역 수정</Modal.Header>
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
          {/* <Button color="white" width="100%" height="42px" leftIcon={SYSTEM.PLUS_GRAY}>
            계속해서 추가하기
          </Button> */}
        </Modal.Footer>
      </div>
    </Modal.Frame>
  );
};
