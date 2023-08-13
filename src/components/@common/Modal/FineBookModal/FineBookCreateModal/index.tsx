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
import { pushDataLayer } from '@/utils/pushDataLayer';
import { checkFormIsValid } from '@/utils/validation';
import { GA } from '@/constants/GA';
import FormFileds from '../FormFileds';
import * as Style from '../styles';
import useFinebook from '@/hooks/Group/useFinebook';

interface Props {
  modalHandler: () => void;
}

const FineBookCreateModal = ({ modalHandler }: Props) => {
  const [calendarState, setDateState] = useRecoilState(dateState);
  const { groupId } = useParams();
  const navigate = useNavigate();

  const { selectData, getFormFiledActions, createLoading } = useFinebook(initialSelectData);
  const { onChangeDate, onInitForm, createDetail } = getFormFiledActions();

  useEffect(() => {
    if (calendarState.mode === 'day') {
      const date = dayjs(calendarState.baseDate).format('YYYY.MM.DD');
      onChangeDate(date);
    }
  }, []);

  const onSuccessCreateDetail = (type: 'continue' | 'save') => {
    pushDataLayer('add_list', { button: type === 'continue' ? 'keep' : 'add' });

    const groundsDate = dayjs(selectData.date);
    setDateState((prev) => ({ ...prev, baseDate: groundsDate, startDate: groundsDate, endDate: groundsDate, mode: 'day' }));

    if (type === 'continue') {
      navigate(`/group/${groupId}/book/detail`, { state: true });
      onInitForm();
    } else {
      navigate(`/group/${groupId}/book/detail`);
      modalHandler();
    }
  };

  const onCreateDetail = (type: 'continue' | 'save') => {
    createDetail().then(() => onSuccessCreateDetail(type));
  };

  return (
    <Modal.Frame width="448px" onClick={modalHandler}>
      <Modal.Header onClick={modalHandler}>내역 추가하기</Modal.Header>
      <Style.FlexColumn>
        <FormFileds action={getFormFiledActions} selectData={selectData} />
        <Modal.Footer flexDirection="column">
          <Button //
            color={checkFormIsValid(selectData) ? 'black' : 'disabled'}
            width="100%"
            height="42px"
            onClick={() => onCreateDetail('save')}
            loading={createLoading}
            id={GA.ADD_LIST.NORMAL}
          >
            추가하기
          </Button>
          <Button
            color={checkFormIsValid(selectData) ? 'white' : 'white-disabled'}
            width="100%"
            height="42px"
            onClick={() => onCreateDetail('continue')}
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
