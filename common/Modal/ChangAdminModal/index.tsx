import Button from '@/common/Button';
import Modal from '@/common/Modal';
import { useChangeAdmin } from '@/queries/Group/useChangeAdmin';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import * as Style from './styles';

interface ChangeAdminModalProps {
  isOpen: boolean;
  modalHandler: () => void;
  onClickConfirm: () => void;
}

const ChangeAdminModal: FC<ChangeAdminModalProps> = ({ isOpen, modalHandler, onClickConfirm }) => {
  return (
    <Modal.Frame isOpen={isOpen} height={'228px'} onClick={modalHandler}>
      <Modal.Header>총무 변경</Modal.Header>
      <Modal.Body>
        <Style.Container>총무를 넘겨주시겠습니까?</Style.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button color="white" width="100%" onClick={modalHandler}>
          취소
        </Button>
        <Button color="black" width="100%" onClick={onClickConfirm}>
          확인
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};

export default ChangeAdminModal;
