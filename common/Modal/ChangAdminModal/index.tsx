import Button from '@/common/Button';
import Modal from '@/common/Modal';
import { useChangeAdmin } from '@/queries/Group/useChangeAdmin';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import * as Style from './styles';

interface ChangeAdminModalProps {
  modalHandler: () => void;
  onClickConfirm: () => void;
}

const ChangeAdminModal: FC<ChangeAdminModalProps> = ({ modalHandler, onClickConfirm }) => {
  return (
    <Modal.Frame height={'215px'} onClick={modalHandler} width={'448px'}>
      <Modal.Header>총무 넘기기</Modal.Header>
      <Modal.Body>
        <Style.Container>총무 권한을 넘겨주시겠습니까?</Style.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button color="white" width="100%" onClick={modalHandler} height="42px">
          취소
        </Button>
        <Button color="black" width="100%" onClick={onClickConfirm} id="toss_manager_modal" height="42px">
          넘겨주기
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};

export default ChangeAdminModal;
