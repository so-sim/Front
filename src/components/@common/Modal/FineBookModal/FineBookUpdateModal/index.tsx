import { Dispatch, SetStateAction, useReducer } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import * as Style from '../styles';
import { useUpdateDetail } from '@/queries/Detail';
import { EventInfoTest } from '@/types/event';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { dateStateTest } from '@/store/dateStateTest';
import { ServerResponse } from '@/types/serverResponse';
import FormFileds from '../FormFileds';
import { selectedDataReducer } from '../reducer/selectedDataReducer';
import { checkFormIsValid } from '@/utils/validation';
import { SelectedEventInfo } from '@/types/event';

interface Props {
  modalHandler: () => void;
  select: SelectedEventInfo;
  setSelect: Dispatch<SetStateAction<SelectedEventInfo>>;
}

const FineBookUpdateModal = ({ modalHandler, select, setSelect }: Props) => {
  const [selectData, dispatch] = useReducer(selectedDataReducer, select);

  const [_, setDateState] = useRecoilState(dateStateTest);

  const onSuccessUpdateDetail = (data: ServerResponse<EventInfoTest>) => {
    const groundsDate = dayjs(data.content.date);

    setSelect((prev) => ({ ...prev, ...data.content, situation: selectData.situation }));
    setDateState((prev) => ({ ...prev, baseDate: groundsDate, selectedDate: groundsDate, week: null }));
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
