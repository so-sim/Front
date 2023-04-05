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

interface ModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  eventId?: number;
  select?: EventInfo;
}

export const FineBookModal = ({ setOpen, eventId, select }: ModalProps) => {
  const type = eventId ? 'update' : 'create';
  const isCreate = type === 'create';
  const isUpdate = select !== undefined;

  const [member, setMember] = useState('');
  const [status, setStatus] = useState<PaymentType | ''>('미납');
  const [reason, setReason] = useState('');
  const [fine, setFine] = useState(0);
  const [groundsDate, setGroundsDate] = useState('');
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

  const params = useParams();
  const { data } = useParticipantList({ groupId: Number(params.groupId) || 1 });
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

  const createDetail = async (type: 'continue' | 'save') => {
    if (user.userId === null) return;
    await create({ userId: user.userId, userName: member, groundsDate, grounds: reason, paymentType: getStatusCode(status), payment: fine });
    await setDateState((prev) => ({ ...prev, baseDate: dayjs(groundsDate), selectedDate: dayjs(groundsDate), week: null }));
    if (type === 'continue') {
      navigate(`/group/${params.groupId}/book/detail`);
      initDetail();
    } else {
      navigate(`/group/${params.groupId}/book/detail`);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (select != null) {
      setMember(select.userName);
      setGroundsDate(select.groundsDate);
      setReason(select.grounds);
      setStatus(getStatusText(select.paymentType));
      setFine(select.payment);
    }
  }, []);

  const updateDetail = () => {
    if (status == '' || select == null) return;
    const { eventId, userId } = select;

    update({ eventId, userId, userName: member, groundsDate, grounds: reason, paymentType: getStatusCode(status), payment: fine });
    setOpen(false);
  };

  const checkFormIsValid = (): boolean => {
    if (!member || !status || !fine || !groundsDate) return false;

    return true;
  };

  const admin = { title: data?.content.adminNickname as string };
  const participantList = data?.content.nicknameList.map((participant) => ({ title: participant })) || [];
  const memberList = [admin, ...participantList];

  const statusList: { title: PaymentType }[] = [{ title: '미납' }, { title: '완납' }, { title: '확인필요' }];

  return (
    <Modal.Frame width="448px" height={type === 'create' ? '466px' : '412px'} onClick={() => setOpen(false)}>
      <Modal.Header onClick={() => setOpen(false)}>{type === 'create' ? '내역 추가하기' : '상세 내역 수정'}</Modal.Header>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Style.Row>
          <Label title="팀원" width="32px">
            <DropBox boxWidth="148px" width={304} setType={setMember} type={isUpdate && member === '' ? select?.userName : member} dropDownList={memberList} direction="right" />
          </Label>
          <Label title="납부여부" width="56px">
            <DropBox
              color="white"
              boxWidth="112px"
              width={112}
              setType={setStatus}
              type={isUpdate && status === '' ? getStatusText(select?.paymentType) : status}
              dropDownList={statusList}
            />
          </Label>
        </Style.Row>
        <Style.Row>
          <Label title="금액" width="32px">
            <Style.Input
              type="string"
              value={isUpdate && fine === 0 ? changeNumberToMoney(select?.payment) : changeNumberToMoney(fine)}
              onChange={onChangeFine}
              style={{ height: '32px' }}
            />
          </Label>
          <Label title="날짜" width="32px">
            <CalendarDropBox type={isUpdate && groundsDate === '' ? select?.groundsDate : groundsDate} setType={setGroundsDate} color="white" />
          </Label>
        </Style.Row>
        <Label title="사유" width="32px">
          <Style.TextArea maxLength={65} onChange={onChangeReason} defaultValue={reason} value={reason} placeholder="내용을 입력해주세요.">
            {isUpdate && reason === '' ? select.grounds : reason}
          </Style.TextArea>
          <Style.Length>{isUpdate && reason === '' ? select?.grounds.length : reason.length}/65</Style.Length>
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
          >
            {isCreate ? '추가하기' : '저장하기'}
          </Button>
          {isCreate && (
            <Button color={checkFormIsValid() ? 'white' : 'white-disabled'} width="100%" height="42px" leftIcon={SYSTEM.PLUS_GRAY} onClick={() => createDetail('continue')}>
              계속해서 추가하기
            </Button>
          )}
        </Modal.Footer>
      </div>
    </Modal.Frame>
  );
};
