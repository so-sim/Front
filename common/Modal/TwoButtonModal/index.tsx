import React, { Dispatch } from 'react';
import Button from '@/common/Button';
import Modal from '@/common/Modal';

interface ModalButton {
  text: string;
  onClick: () => void;
}

export interface TwoButtonModalProps {
  onClick: () => void;
  title: string;
  description: string;
  cancel: ModalButton;
  confirm: ModalButton;
  flexDirection?: 'row' | 'column';
}

export const TwoButtonModal = ({ onClick, title, description, cancel, confirm, flexDirection = 'row' }: TwoButtonModalProps) => {
  return (
    <Modal.Frame width="376px" height="223px" onClick={onClick}>
      <Modal.Header>
        <div style={{ textAlign: 'center', height: '32px', marginBottom: '4px' }}>{title}</div>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: 'center', padding: '20px' }}>{description}</div>
      </Modal.Body>
      <div style={{ height: '12px' }} />
      <Modal.Footer flexDirection={flexDirection}>
        <Button width="100%" height="42px" color="white" onClick={cancel.onClick}>
          {cancel.text}
        </Button>
        <Button width="100%" height="42px" color="black" onClick={confirm.onClick}>
          {confirm.text}
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
