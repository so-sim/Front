import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import { ConfirmModalType } from '@/constants/Confirm';
import * as Style from './styels';
import { CONFIRM_MODAL } from '@/constants/Confirm';

interface Props {
  modalHandler: () => void;
  width?: string;
  cancel?: () => void;
  confirm: () => void;
  flexDirection?: 'row' | 'column';
  id?: string;
  type: ConfirmModalType;
}

export const ConfirmModal = ({ modalHandler, cancel, confirm, flexDirection = 'row', width = '448px', id, type }: Props) => {
  const hasCancelProperty = cancel && CONFIRM_MODAL[type].hasOwnProperty('cancel');

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
        <Button width="100%" height="42px" color={hasCancelProperty ? 'black' : 'white'} onClick={confirm} id={id}>
          {CONFIRM_MODAL[type].confirm}
        </Button>
      </Modal.Footer>
    </Modal.Frame>
  );
};
