import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from '@/common/Button';
import { Label } from '@/common/Label';
import Modal from '@/common/Modal';
import { DropBox } from '@/common/DropBox';
import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import { useParticipantList } from '@/queries/Group';
import { useCreateDetail, useUpdateDetail } from '@/queries/Detail';
import { useNavigate, useParams } from 'react-router-dom';
import { EventInfo, PaymentType } from '@/types/event';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import { CalendarDropBox } from '@/common/DropBox/CalendarDropBox';
import dayjs from 'dayjs';
import { dateState } from '@/store/dateState';
import { getStatusCode, getStatusText } from '@/utils/getStatusIcon';
import { pushDataLayer } from '@/utils/pushDataLayer';

interface ModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  eventId?: number;
  select?: EventInfo;
  setSelect?: Dispatch<SetStateAction<EventInfo>>;
}

export const FineBookModal = ({ setOpen, eventId, select, setSelect }: ModalProps) => {
  const type = eventId ? 'update' : 'create';
  const isCreate = type === 'create';
  const isUpdate = select !== undefined;
  const [member, setMember] = useState(select?.userName ?? '');
  const [status, setStatus] = useState<PaymentType>(select?.paymentType ? getStatusText(select?.paymentType) : '미납');
  const [reason, setReason] = useState(select?.grounds ?? '');
  const [fine, setFine] = useState(select?.payment ?? 0);
  const [groundsDate, setGroundsDate] = useState(dayjs(select?.groundsDate).format('YYYY.MM.DD'));
  const [{ selectedDate, baseDate }, setDateState] = useRecoilState(dateState);

  const onChangeFine = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 8) return;
    const removedCommaValue = Number(value.replaceAll(',', ''));
    if (!isNaN(removedCommaValue)) setFine(removedCommaValue);
  };

  const onChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 65) return;
    setReason(e.target.value);
  };

  const { groupId } = useParams();
  const { data } = useParticipantList(Number(groupId));
  const { mutate: create } = useCreateDetail();
  const { mutate: update } = useUpdateDetail();

  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const initDetail = () => {
    setMember('');
    setStatus('미납');
    setReason('');
    setFine(0);
    setGroundsDate('');
  };

  const createDetail = (type: 'continue' | 'save') => {
    if (user.userId === null) return;
    create(
      {
        groupId: Number(groupId),
        userId: user.userId,
        userName: member,
        groundsDate,
        grounds: reason,
        paymentType: getStatusCode(status),
        payment: fine,
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
            setOpen(false);
          }
        },
      },
    );
  };

  const updateDetail = () => {
    if (status == '' || select == null) return;
    const { eventId, userId } = select;

    update(
      { eventId, userId, userName: member, groundsDate, grounds: reason, paymentType: getStatusCode(status), payment: fine },
      {
        onSuccess(data) {
          if (setSelect) {
            setSelect((prev) => ({ ...prev, ...data.content, paymentType: getStatusText(status) }));
            setDateState((prev) => ({ ...prev, baseDate: dayjs(data.content.groundsDate), selectedDate: dayjs(data.content.groundsDate), week: null }));
            setOpen(false);
          }
        },
      },
    );
  };

  const checkFormIsValid = (): boolean => {
    if (!member || !status || !fine || !groundsDate) return false;

    return true;
  };

  const admin = { title: data?.content.adminNickname as string };
  const participantList = data?.content.memberList.map(({ nickname }) => ({ title: nickname })) || [];
  const memberList = [admin, ...participantList];

  const statusList: { title: PaymentType; id?: string }[] = [
    { title: '미납', id: 'nonpayment_modify' },
    { title: '완납', id: 'fullpayment_modify' },
  ];

  return (
    <Modal.Frame width="448px" height={type === 'create' ? '466px' : '412px'} onClick={() => setOpen(false)}>
      <Modal.Header onClick={() => setOpen(false)}>{type === 'create' ? '내역 추가하기' : '상세 내역 수정'}</Modal.Header>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Style.Row>
          <Label title="팀원" width="32px" margin="0px">
            <DropBox boxWidth="148px" width={304} setType={setMember} type={member} dropDownList={memberList} direction="right" />
          </Label>
          <Label title="납부여부" width="56px" margin="0px">
            <DropBox color="white" boxWidth="112px" width={112} setType={setStatus} type={status} dropDownList={statusList.filter((paymentType) => paymentType.title !== status)} />
          </Label>
        </Style.Row>
        <Style.Row>
          <Label title="금액" width="32px" margin="0px">
            <Style.Input type="string" value={changeNumberToMoney(fine)} onChange={onChangeFine} style={{ height: '32px' }} />
          </Label>
          <Label title="날짜" width="32px" margin="0px">
            <CalendarDropBox type={groundsDate} setType={setGroundsDate} color="white" />
          </Label>
        </Style.Row>
        <Label title="사유" width="32px" margin="0px">
          <Style.TextArea maxLength={65} onChange={onChangeReason} defaultValue={reason} value={reason} placeholder="내용을 입력해주세요." />
          <Style.Length>{!isCreate ? select?.grounds.length : reason.length}/65</Style.Length>
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
