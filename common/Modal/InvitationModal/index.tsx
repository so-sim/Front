import React, { FC, useEffect, useState } from 'react';
import Button from '../../Button';
import { Input, Label } from '@/common';
import Modal from '@/common/Modal';
import { PLACEHOLDER } from '@/constants';
import { isValid } from '@/utils/validation';
import * as Style from './styles';
import { ModalProps } from '@/common/Modal';

export const InvitationModal: FC<ModalProps> = ({ isOpen, onClick }) => {
  const [myName, setMyName] = useState('');
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    if (myName !== '' && isInit) setIsInit(false);
  }, [myName]);

  return (
    <Modal.Frame isOpen={isOpen} width="448px" height="262px">
      <Modal.Header onClick={onClick}>
        <Style.Title>한사랑 산악회 모임</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Label title="내 이름">
          <Input placeholder={PLACEHOLDER.NAME} value={myName} isValid={isInit || isValid(myName)} onChange={setMyName} maxLength={15} />
        </Label>
      </Modal.Body>
      <Modal.Footer>
        <Button color={myName !== '' ? 'primary' : 'disabled'} width="100%" height="42px">
          입장하기
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
