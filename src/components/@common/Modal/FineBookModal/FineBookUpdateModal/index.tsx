import { Dispatch, SetStateAction, useReducer } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import * as Style from '../styles';
import { useUpdateDetail } from '@/queries/Detail';
import { ClientEventInfo, EventInfo } from '@/types/event';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { dateStateTest } from '@/store/dateStateTest';
import { getStatusCode, getStatusText } from '@/utils/status';
import { ServerResponse } from '@/types/serverResponse';
import FormFileds from '../FormFileds';
import { selectedDataReducer } from '../reducer/selectedDataReducer';
import { checkFormIsValid } from '@/utils/validation';

interface Props {
  modalHandler: () => void;
  select: ClientEventInfo;
  setSelect: Dispatch<SetStateAction<ClientEventInfo>>;
}

const FineBookUpdateModal = ({ modalHandler, select, setSelect }: Props) => {
  const [selectData, dispatch] = useReducer(selectedDataReducer, select);

  const [_, setDateState] = useRecoilState(dateStateTest);

  const onSuccessUpdateDetail = (data: ServerResponse<EventInfo>) => {
    const groundsDate = dayjs(data.content.groundsDate);

    setSelect((prev) => ({ ...prev, ...data.content, paymentType: getStatusText(selectData.paymentType) }));
    setDateState((prev) => ({ ...prev, baseDate: groundsDate, selectedDate: groundsDate, week: null }));
    modalHandler();
  };

  const { mutate: update, isLoading: updateLoading } = useUpdateDetail(onSuccessUpdateDetail);

  const updateDetail = () => {
    if (selectData.paymentType == '') return;
    const { eventId, userId } = select;

    update({ ...selectData, eventId, userId, paymentType: getStatusCode(selectData.paymentType) });
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
