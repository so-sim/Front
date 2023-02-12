import React, { useState } from 'react';
import Button from '../../../../../common/Button';
import { Input } from '../../../../../common/Input';
import { Label } from '../../../../../common/Label';
import Modal from '../../../../../common/Modal';
import * as Style from './styles';

export const InviteModal = () => {
  const [form, setForm] = useState({ myName: '' });

  return (
    <Modal.Frame isOpen={true} width="448px" height="262px">
      <Modal.Header onClick={() => console.log('hi')}>
        <Style.Title>한사랑 산악회 모임</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Label title="내이름">
          <Input value={form} onChange={setForm} type="myName" isValid={false} maxLength={20} />
        </Label>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginTop: '20px', width: '100%' }}>
          <Button color="disabled" width="100%">
            입장하기
          </Button>
        </div>
      </Modal.Footer>
    </Modal.Frame>
  );
};
