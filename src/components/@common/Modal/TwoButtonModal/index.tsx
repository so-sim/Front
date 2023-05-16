import React from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import * as Style from './styels';

export interface ModalButton {
  text: string;
  onClick: () => void;
}

export interface TwoButtonModalProps {
  onClick: () => void;
  title: string;
  width?: string;
  height?: string;
  description: string;
  cancel: ModalButton;
  confirm: ModalButton;
  flexDirection?: 'row' | 'column';
  id?: string;
}

export const TwoButtonModal = ({ onClick, title, description, cancel, confirm, flexDirection = 'row', width = '448px', height = '215px', id }: TwoButtonModalProps) => {
  return (
    <Modal.Frame width={width} height={height} onClick={onClick}>
      <Modal.Header>
        <Style.Title>{title}</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Style.Desc>{description}</Style.Desc>
      </Modal.Body>
      <Modal.Footer flexDirection={flexDirection}>
        <Button width="100%" height="42px" color="white" onClick={cancel.onClick}>
          {cancel.text}
        </Button>
        <Button width="100%" height="42px" color="black" onClick={confirm.onClick} id={id}>
          {confirm.text}
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
