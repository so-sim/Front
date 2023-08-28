import { Dispatch, SetStateAction, useReducer } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import * as Style from '../styles';
import { useUpdateDetail } from '@/queries/Detail';
import { EventInfoTest } from '@/types/event';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { dateState } from '@/store/dateState';
import { ServerResponse } from '@/types/serverResponse';
import FormFileds from '../FormFileds';
import { selectedDataReducer } from '../reducer/selectedDataReducer';
import { checkFormIsValid } from '@/utils/validation';
import { SelectedEventInfo } from '@/types/event';
import { useSelectedContext } from '@/contexts/SelectedFineContext';
import useFinebook from '@/hooks/Group/useFinebook';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useWithdrawalParticipantList } from '@/queries/Group/useWithdrawalParticipantList';
import { useParams } from 'react-router-dom';

interface Props {
  modalHandler: () => void;
}

const FineBookUpdateModal = ({ modalHandler }: Props) => {
  const { groupId } = useParams();
  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const { selectData, getFormFiledActions, updateLoading } = useFinebook(selectedFine);
  const { isWithdrawal } = useWithdrawalParticipantList(Number(groupId));
  const { updateDetail } = getFormFiledActions();

  const [_, setDateState] = useRecoilState(dateState);

  const onSuccessUpdateDetail = () => {
    const groundsDate = dayjs(selectData.date);

    setSelectedFine((prev) => ({ ...prev, ...selectData }));
    setDateState((prev) => ({ ...prev, baseDate: groundsDate, startDate: groundsDate, endDate: groundsDate }));
    modalHandler();
  };

  const onUpdateDetail = () => {
    const isWithdrawalMemberDetail = isWithdrawal(selectedFine.nickname) && selectedFine.nickname !== selectData.nickname;
    if (isWithdrawalMemberDetail) {
      return openConfirmModal({
        type: 'CHANGE_WITHDRAWAL_MEMBER_DETAIL',
        confirm: () => updateDetail().then(onSuccessUpdateDetail),
        cancel: closeConfirmModal,
      });
    }
    updateDetail().then(onSuccessUpdateDetail);
  };

  return (
    <Modal.Frame width="448px" onClick={modalHandler}>
      <Modal.Header onClick={modalHandler}>상세 내역 수정</Modal.Header>
      <Style.FlexColumn>
        <FormFileds action={getFormFiledActions} selectData={selectData} />
        <Modal.Footer>
          <Button //
            color={checkFormIsValid(selectData) ? 'black' : 'disabled'}
            width="100%"
            height="42px"
            onClick={onUpdateDetail}
            loading={updateLoading}
          >
            저장하기
          </Button>
        </Modal.Footer>
      </Style.FlexColumn>
    </Modal.Frame>
  );
};

export default FineBookUpdateModal;
