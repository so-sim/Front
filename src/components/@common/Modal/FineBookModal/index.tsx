import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '@/components/@common/Button';
import Modal from '@/components/@common/Modal';
import { DropBox, Label } from '@/components/@common';
import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import { useParticipantList } from '@/queries/Group';
import { useCreateDetail, useUpdateDetail } from '@/queries/Detail';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientEventInfo, EventInfo, PaymentType } from '@/types/event';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import { CalendarDropBox } from '@/components/@common/DropBox/CalendarDropBox';
import dayjs from 'dayjs';
import { dateState } from '@/store/dateState';
import { getStatusCode, getStatusText } from '@/utils/status';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { ServerResponse } from '@/types/serverResponse';
import { removeCommaFromPayment } from '@/utils/removeCommaFromPayment';

interface Props {
  modalHandler: () => void;
  eventId?: number;
  select?: ClientEventInfo;
  setSelect?: Dispatch<SetStateAction<ClientEventInfo>>;
}

const STATUS_LIST: { title: PaymentType; id?: string }[] = [
  { title: '미납', id: 'nonpayment_modify' },
  { title: '완납', id: 'fullpayment_modify' },
];

export const FineBookModal = ({ modalHandler, eventId, select, setSelect }: Props) => {
  const type = eventId ? 'update' : 'create';
  const isCreate = type === 'create';

  const [userName, setUserName] = useState(select?.userName ?? '');
  const [status, setStatus] = useState<PaymentType>(select?.paymentType ? getStatusText(select?.paymentType) : '미납');
  const [grounds, setGrounds] = useState(select?.grounds ?? '');
  const [payment, setPayment] = useState(select?.payment ?? 0);
  const [groundsDate, setGroundsDate] = useState(dayjs(select?.groundsDate).format('YYYY.MM.DD'));
  const [_, setDateState] = useRecoilState(dateState);

  const onChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: payment } = e.target;
    if (payment.length > 8) return;

    const paymentWithoutComma = removeCommaFromPayment(payment);
    if (!isNaN(paymentWithoutComma)) setPayment(paymentWithoutComma);
  };

  const onChangeGrounds = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 65) return;
    setGrounds(e.target.value);
  };

  const onSuccessUpdateDetail = (data: ServerResponse<EventInfo>) => {
    if (setSelect) {
      setSelect((prev) => ({ ...prev, ...data.content, paymentType: getStatusText(status) }));
      setDateState((prev) => ({ ...prev, baseDate: dayjs(data.content.groundsDate), selectedDate: dayjs(data.content.groundsDate), week: null }));
      modalHandler();
    }
  };

  const { groupId } = useParams();
  const { data } = useParticipantList(Number(groupId));
  const { mutate: create, isLoading: createLoading } = useCreateDetail();
  const { mutate: update, isLoading: updateLoading } = useUpdateDetail(onSuccessUpdateDetail);

  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const initDetail = () => {
    setUserName('');
    setStatus('미납');
    setGrounds('');
    setPayment(0);
    setGroundsDate(dayjs().format('YYYY.MM.DD'));
  };

  const createDetail = (type: 'continue' | 'save') => {
    if (user.userId === null) return;
    if (status === '') return;
    create(
      {
        groupId: Number(groupId),
        userId: user.userId,
        userName,
        groundsDate,
        grounds,
        paymentType: getStatusCode(status),
        payment,
      },
      {
        onSuccess() {
          pushDataLayer('add_list', { button: type === 'continue' ? 'keep' : 'normal' });
          setDateState((prev) => ({ ...prev, baseDate: dayjs(groundsDate), selectedDate: dayjs(groundsDate), week: null }));
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

  const updateDetail = () => {
    if (status == '' || select == null) return;
    const { eventId, userId } = select;

    update({ eventId, userId, userName, groundsDate, grounds, paymentType: getStatusCode(status), payment });
  };

  const checkFormIsValid = (): boolean => {
    if (!userName || !status || !payment || !groundsDate) return false;

    return true;
  };

  const admin = { title: data?.content.adminNickname as string };
  const participantList = data?.content.memberList.map(({ nickname }) => ({ title: nickname })) || [];
  const memberList = [admin, ...participantList];

  return (
    <Modal.Frame width="448px" height={isCreate ? '466px' : '412px'} onClick={modalHandler}>
      <Modal.Header onClick={modalHandler}>{isCreate ? '내역 추가하기' : '상세 내역 수정'}</Modal.Header>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Style.Row>
          <Label title="팀원" width="32px" margin="0px">
            <DropBox boxWidth="146px" width={304} setType={setUserName} type={userName} dropDownList={memberList} direction="right" />
          </Label>
          <Label title="납부여부" width="56px" margin="0px">
            <DropBox
              color="white"
              boxWidth="110px"
              width={112}
              setType={setStatus}
              type={status}
              dropDownList={STATUS_LIST.filter((paymentType) => paymentType.title !== status)}
            />
          </Label>
        </Style.Row>
        <Style.Row>
          <Label title="금액" width="32px" margin="0px">
            <Style.Input type="string" value={changeNumberToMoney(payment)} onChange={onChangePayment} style={{ height: '32px' }} />
          </Label>
          <Label title="날짜" width="32px" margin="0px">
            <CalendarDropBox type={groundsDate} setType={setGroundsDate} color="white" />
          </Label>
        </Style.Row>
        <Label title="사유" width="32px" margin="0px">
          <Style.TextArea maxLength={65} onChange={onChangeGrounds} defaultValue={grounds} value={grounds} placeholder="내용을 입력해주세요." />
          <Style.Length>{grounds.length}/65</Style.Length>
        </Label>
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
            id={isCreate ? 'add_list_normal' : ''}
          >
            {isCreate ? '추가하기' : '저장하기'}
          </Button>
          {isCreate && (
            <Button
              id="add_list_keep"
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
      </div>
    </Modal.Frame>
  );
};
