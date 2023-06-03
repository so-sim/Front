import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import { ConfirmModalType } from '@/constants/Confirm';
import * as Style from './styels';
import { CONFIRM_MODAL } from '@/constants/Confirm';
import { useRecoilState } from 'recoil';
import { confirmModalState } from '@/store/confirmModalState';

interface Props {
  modalHandler: () => void;
  width?: string;
  cancel?: () => void;
  confirm: () => Promise<void>;
  flexDirection?: 'row' | 'column';
  id?: string;
  type: ConfirmModalType;
}

export const ConfirmModal = ({ modalHandler, cancel, confirm, flexDirection = 'row', width = '448px', id, type }: Props) => {
  const hasCancelProperty = cancel && CONFIRM_MODAL[type].hasOwnProperty('cancel');

  const closeModalAfterSuccessConfirm = () => {
    confirm().then(cancel);
  };

  return (
    <Modal.Frame width={width} onClick={modalHandler}>
      <Modal.Header>
        <Style.Title>{CONFIRM_MODAL[type].title}</Style.Title>
      </Modal.Header>
      <Modal.Body>
        <Style.Desc>{CONFIRM_MODAL[type].description}</Style.Desc>
      </Modal.Body>
      <Modal.Footer flexDirection={flexDirection}>
        {hasCancelProperty && (
          <Button width="100%" height="42px" color="white" onClick={cancel}>
            취소
          </Button>
        )}
        <Button width="100%" height="42px" color={hasCancelProperty ? 'black' : 'white'} onClick={closeModalAfterSuccessConfirm} id={id}>
          {CONFIRM_MODAL[type].confirm}
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};

export const GlobalConfirmModal = () => {
  const [confirmModal, setConfirmModal] = useRecoilState(confirmModalState);

  const modalHandler = () => {
    setConfirmModal((prev) => ({ ...prev, type: null }));
  };

  const renderer = () => {
    if (confirmModal.type === null) {
      return null;
    }

    return <ConfirmModal modalHandler={modalHandler} cancel={confirmModal.cancel} type={confirmModal.type} confirm={confirmModal.confirm} />;
  };

  return <>{renderer()}</>;
};
