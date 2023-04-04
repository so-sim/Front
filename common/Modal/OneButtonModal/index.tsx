import Button from '@/common/Button';
import React, { FC } from 'react';
import Modal from '..';
import { ModalButton } from '../TwoButtonModal';
import * as Style from './styles';

interface OneButtonModalProps {
  onClick: () => void;
  title: string;
  width?: string;
  height?: string;
  description: string;
  confirm: ModalButton;
}

export const OneButtonModal: FC<OneButtonModalProps> = ({ onClick, title, description, confirm, width = '376px', height = '223px' }) => {
  return (
    <Modal.Frame width={width} height={height} onClick={onClick}>
      <Modal.Header>
        <Style.Title>{title}</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Style.Desc>{description}</Style.Desc>
      </Modal.Body>
      <Modal.Footer>
        <Button width="100%" color="white" height="42px" onClick={confirm.onClick}>
          {confirm.text}
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
