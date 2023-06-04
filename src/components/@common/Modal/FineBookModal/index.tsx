import { Dispatch, SetStateAction, useReducer } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import { useCreateDetail, useUpdateDetail } from '@/queries/Detail';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientEventInfo, EventInfo, PaymentType } from '@/types/event';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import dayjs from 'dayjs';
import { dateState } from '@/store/dateState';
import { getStatusCode, getStatusText } from '@/utils/status';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { ServerResponse } from '@/types/serverResponse';
import { convertFromPriceFormat } from '@/utils/convertPriceFormat';
import { GA } from '@/constants/GA';
import { initialSelectData } from '@/pages/FineBook/DetailFine';
import FormFileds from './FormFileds';

interface Props {
  modalHandler: () => void;
  eventId?: number;
  select?: ClientEventInfo;
  setSelect?: Dispatch<SetStateAction<ClientEventInfo>>;
}

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

export const FineBookModal = ({ modalHandler, eventId, select, setSelect }: Props) => {
  const type = eventId ? 'update' : 'create';
  const isCreate = type === 'create';
  const [selectData, dispatch] = useReducer(selectedDataReducer, select ?? initialSelectData);

  const [_, setDateState] = useRecoilState(dateState);

  /** 공통 로직 */
  const { groupId } = useParams();
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const initDetail = () => {
    dispatch({ type: 'INIT', initialData: initialSelectData });
  };
  const checkFormIsValid = (): boolean => {
    const { userName, payment, paymentType, groundsDate } = selectData;
    if (!userName || !paymentType || !payment || !groundsDate) return false;

    return true;
  };
  /** 공통 로직 */

  /** create 로직 */

  const createDetail = (type: 'continue' | 'save') => {
    if (user.userId === null) return;
    if (selectData.paymentType === '') return;
    create(
      {
        ...selectData,
        groupId: Number(groupId),
        userId: user.userId,
        paymentType: getStatusCode(selectData.paymentType),
      },
      {
        onSuccess() {
          pushDataLayer('add_list', { button: type === 'continue' ? 'keep' : 'normal' });
          setDateState((prev) => ({ ...prev, baseDate: dayjs(selectData.groundsDate), selectedDate: dayjs(selectData.groundsDate), week: null }));
          if (type === 'continue') {
            navigate(`/group/${groupId}/book/detail`, { state: true });
            initDetail();
          } else {
            navigate(`/group/${groupId}/book/detail`);
            modalHandler();
          }
        },
      },
    );
  };
  const { mutate: create, isLoading: createLoading } = useCreateDetail();
  /** create 로직 */

  /** update 로직 */
  const onSuccessUpdateDetail = (data: ServerResponse<EventInfo>) => {
    if (setSelect) {
      setSelect((prev) => ({ ...prev, ...data.content, paymentType: getStatusText(selectData.paymentType) }));
      setDateState((prev) => ({ ...prev, baseDate: dayjs(data.content.groundsDate), selectedDate: dayjs(data.content.groundsDate), week: null }));
      modalHandler();
    }
  };
  const { mutate: update, isLoading: updateLoading } = useUpdateDetail(onSuccessUpdateDetail);

  const updateDetail = () => {
    if (selectData.paymentType == '' || select == null) return;
    const { eventId, userId } = select;

    update({ ...selectData, eventId, userId, paymentType: getStatusCode(selectData.paymentType) });
  };

  /** update 로직 */

  return (
    <Modal.Frame width="448px" height={isCreate ? '466px' : '412px'} onClick={modalHandler}>
      <Modal.Header onClick={modalHandler}>{isCreate ? '내역 추가하기' : '상세 내역 수정'}</Modal.Header>
      <Style.FlexColumn>
        <FormFileds dispatch={dispatch} selectData={selectData} />
        <Modal.Footer flexDirection="column">
          <Button
            color={checkFormIsValid() ? 'black' : 'disabled'}
            width="100%"
            height="42px"
            onClick={() => {
              if (isCreate) return createDetail('save');
              updateDetail();
            }}
            loading={isCreate ? createLoading : updateLoading}
            id={isCreate ? GA.ADD_LIST.NORMAL : ''}
          >
            {isCreate ? '추가하기' : '저장하기'}
          </Button>
          {isCreate && (
            <Button
              id={GA.ADD_LIST.KEEP}
              color={checkFormIsValid() ? 'white' : 'white-disabled'}
              width="100%"
              height="42px"
              leftIcon={SYSTEM.PLUS_GRAY_SM}
              onClick={() => createDetail('continue')}
            >
              계속해서 추가하기
            </Button>
          )}
        </Modal.Footer>
      </Style.FlexColumn>
    </Modal.Frame>
  );
};
