import { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCreateDetail } from '@/queries/Detail';
import dayjs from 'dayjs';

import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import { SYSTEM } from '@/assets/icons/System';
import { dateState } from '@/store/dateState';
import { initialSelectData } from '@/pages/FineBook/DetailFine';
import { SelectedEventInfo } from '@/types/event';

import { selectedDataReducer } from '../reducer/selectedDataReducer';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { checkFormIsValid } from '@/utils/validation';
import { GA } from '@/constants/GA';
import FormFileds from '../FormFileds';
import * as Style from '../styles';

interface Props {
  modalHandler: () => void;
}

const doNotInitProperty = <K extends keyof SelectedEventInfo>(...arg: K[]) => {
  const newObj: Partial<SelectedEventInfo> = {};

  arg.forEach((key) => {
    newObj[key] = initialSelectData[key];
  });

  return newObj;
};

const FineBookCreateModal = ({ modalHandler }: Props) => {
  const [calendarState, setDateState] = useRecoilState(dateState);
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [selectData, dispatch] = useReducer(selectedDataReducer, initialSelectData);

  useEffect(() => {
    if (calendarState.mode === 'day') {
      const date = dayjs(calendarState.baseDate).format('YYYY.MM.DD');
      dispatch({ type: 'DATE', date });
    }
  }, []);

  const createDetail = (type: 'continue' | 'save') => {
    create(
      {
        ...selectData,
        groupId: Number(groupId),
        situation: selectData.situation,
      },
      {
        onSuccess() {
          pushDataLayer('add_list', { button: type === 'continue' ? 'keep' : 'add' });

          const groundsDate = dayjs(selectData.date);
          setDateState((prev) => ({ ...prev, baseDate: groundsDate, startDate: groundsDate, endDate: groundsDate, mode: 'day' }));

          if (type === 'continue') {
            navigate(`/group/${groupId}/book/detail`, { state: true });
            dispatch({ type: 'INIT', initialData: doNotInitProperty('nickname', 'memo') });
          } else {
            navigate(`/group/${groupId}/book/detail`);
            modalHandler();
          }
        },
      },
    );
  };

  const { mutate: create, isLoading: createLoading } = useCreateDetail();

  return (
    <Modal.Frame width="448px" onClick={modalHandler}>
      <Modal.Header onClick={modalHandler}>내역 추가하기</Modal.Header>
      <Style.FlexColumn>
        <FormFileds dispatch={dispatch} selectData={selectData} />
        <Modal.Footer flexDirection="column">
          <Button //
            color={checkFormIsValid(selectData) ? 'black' : 'disabled'}
            width="100%"
            height="42px"
            onClick={() => createDetail('save')}
            loading={createLoading}
            id={GA.ADD_LIST.NORMAL}
          >
            추가하기
          </Button>
          <Button
            color={checkFormIsValid(selectData) ? 'white' : 'white-disabled'}
            width="100%"
            height="42px"
            onClick={() => createDetail('continue')}
            leftIcon={SYSTEM.PLUS_GRAY_SM}
            id={GA.ADD_LIST.KEEP}
          >
            계속해서 추가하기
          </Button>
        </Modal.Footer>
      </Style.FlexColumn>
    </Modal.Frame>
  );
};

export default FineBookCreateModal;
