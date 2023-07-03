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

interface Props {
  modalHandler: () => void;
}

const FineBookUpdateModal = ({ modalHandler }: Props) => {
  const { selectedFine, setSelectedFine } = useSelectedContext('userDetails');

  const [selectData, dispatch] = useReducer(selectedDataReducer, selectedFine);

  const [_, setDateState] = useRecoilState(dateState);

  const onSuccessUpdateDetail = (data: ServerResponse<EventInfoTest>) => {
    const groundsDate = dayjs(selectData.date);

    setSelectedFine((prev) => ({ ...prev, ...selectData }));
    setDateState((prev) => ({ ...prev, baseDate: groundsDate, startDate: groundsDate, endDate: groundsDate }));
    modalHandler();
  };

  const { mutate: update, isLoading: updateLoading } = useUpdateDetail(onSuccessUpdateDetail);

  const updateDetail = () => {
    update(selectData);
  };

  return (
    <Modal.Frame width="448px" onClick={modalHandler}>
      <Modal.Header onClick={modalHandler}>상세 내역 수정</Modal.Header>
      <Style.FlexColumn>
        <FormFileds dispatch={dispatch} selectData={selectData} />
        <Modal.Footer>
          <Button //
            color={checkFormIsValid(selectData) ? 'black' : 'disabled'}
            width="100%"
            height="42px"
            onClick={updateDetail}
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
