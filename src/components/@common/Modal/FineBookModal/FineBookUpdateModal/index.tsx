import { Dispatch, SetStateAction, useReducer } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import * as Style from '../styles';
import { useUpdateDetail } from '@/queries/Detail';
import { ClientEventInfo, EventInfo, PaymentType } from '@/types/event';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { dateState } from '@/store/dateState';
import { getStatusCode, getStatusText } from '@/utils/status';
import { ServerResponse } from '@/types/serverResponse';
import { convertFromPriceFormat } from '@/utils/convertPriceFormat';
import FormFileds from '../FormFileds';

interface Props {
  modalHandler: () => void;
  select: ClientEventInfo;
  setSelect: Dispatch<SetStateAction<ClientEventInfo>>;
}

/** 공통 로직 */
type Action =
  | { type: 'USER_NAME'; userName: string }
  | { type: 'GROUNDS'; grounds: string }
  | { type: 'GROUNDS_DATE'; groundsDate: string }
  | { type: 'PAYMENT'; payment: string }
  | { type: 'PAYMENT_TYPE'; paymentType: PaymentType }
  | { type: 'INIT'; initialData: ClientEventInfo };

const selectedDataReducer = (state: ClientEventInfo, actions: Action) => {
  switch (actions.type) {
    case 'USER_NAME':
      const { userName } = actions;
      return { ...state, userName };
    case 'GROUNDS':
      const { grounds } = actions;
      if (grounds.length > 65) return state;

      return { ...state, grounds };
    case 'GROUNDS_DATE':
      const { groundsDate } = actions;
      return { ...state, groundsDate };
    case 'PAYMENT':
      const { payment } = actions;
      if (payment.length > 8) return state;

      const convertPayment = convertFromPriceFormat(payment);
      if (!isNaN(convertPayment)) return { ...state, payment: convertPayment };
      return state;
    case 'PAYMENT_TYPE':
      const { paymentType } = actions;
      return { ...state, paymentType };
    case 'INIT':
      const { initialData } = actions;
      return { ...state, initialData };
    default:
      throw new Error('정의되지 않은 타입입니다.');
  }
};
/** 공통 로직 */

const FineBookUpdateModal = ({ modalHandler, select, setSelect }: Props) => {
  /** 공통 로직 */
  const [selectData, dispatch] = useReducer(selectedDataReducer, select);

  const [_, setDateState] = useRecoilState(dateState);

  const checkFormIsValid = (): boolean => {
    const { userName, payment, paymentType, groundsDate } = selectData;
    if (!userName || !paymentType || !payment || !groundsDate) return false;

    return true;
  };
  /** 공통 로직 */

  const onSuccessUpdateDetail = (data: ServerResponse<EventInfo>) => {
    setSelect((prev) => ({ ...prev, ...data.content, paymentType: getStatusText(selectData.paymentType) }));
    setDateState((prev) => ({ ...prev, baseDate: dayjs(data.content.groundsDate), selectedDate: dayjs(data.content.groundsDate), week: null }));
    modalHandler();
  };

  const { mutate: update, isLoading: updateLoading } = useUpdateDetail(onSuccessUpdateDetail);

  const updateDetail = () => {
    if (selectData.paymentType == '' || select == null) return;
    const { eventId, userId } = select;

    update({ ...selectData, eventId, userId, paymentType: getStatusCode(selectData.paymentType) });
  };

  return (
    <Modal.Frame width="448px" onClick={modalHandler}>
      <Modal.Header onClick={modalHandler}>상세 내역 수정</Modal.Header>
      <Style.FlexColumn>
        <FormFileds dispatch={dispatch} selectData={selectData} />
        <Modal.Footer>
          <Button color={checkFormIsValid() ? 'black' : 'disabled'} width="100%" height="42px" onClick={updateDetail} loading={updateLoading}>
            저장하기
          </Button>
        </Modal.Footer>
      </Style.FlexColumn>
    </Modal.Frame>
  );
};

export default FineBookUpdateModal;
