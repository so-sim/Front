import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '@/common/Button';
import { Label } from '@/common/Label';
import Modal from '@/common/Modal';
import { DropBox } from '@/common/DropBox';
import * as Style from './styles';
import { SYSTEM } from '@/assets/icons/System';
import { useParticipantList } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { GroupId } from '@/types/group';
import { useCreateDetail } from '@/queries/Detail/useCreateDetail';
import { PaymentType } from '@/types/event';
import { useUpdateDetail } from '@/queries/Detail/useUpdateDetail';
import { useGetOneOfDetail } from '@/queries/Detail/useGetOneOfDetail';

interface ModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  type?: 'update' | 'create';
}

export const FineBookModal = ({ setOpen, type = 'create' }: ModalProps) => {
  const [member, setMember] = useState('');
  const [status, setStatus] = useState<PaymentType | ''>('');

  const [reason, setReason] = useState('');

  const [fine, setFine] = useState(0);

  const isAllowedKey = (key: string): boolean => {
    const allowedKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Enter', 'Tab'];
    if (allowedKey.includes(key)) return true;
    return false;
  };

  const onChangeFine = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isAllowedKey(e.key))
      setFine((prev) => {
        if (!isNaN(Number(e.key))) return Number(String(prev) + e.key);
        if (e.key === 'Backspace') return Number(String(prev).slice(0, -1));
        return prev;
      });
  };

  const onChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 65) return;

    setReason(e.target.value);
  };

  const params = useParams();
  const { data: detail } = useGetOneOfDetail(123);
  const { data } = useParticipantList({ groupId: Number(params.groupId) || 1 });
  const { mutate: create } = useCreateDetail();
  const { mutate: update } = useUpdateDetail();

  const isCreate = type === 'create';

  const initDetail = () => {
    setMember('');
    setStatus('');
    setReason('');
    setFine(0);
  };

  const createDetail = async (type: 'continue' | 'save') => {
    if (status == '') {
      console.warn('status is undefined');
      return;
    }
    await create({ userId: 3, userName: '윤둘', groundsDate: '', grounds: reason, paymentType: status, payment: fine });
    if (type === 'continue') {
      initDetail();
      return;
    }
    setOpen(false);
  };

  const updateDetail = () => {
    if (status == '') {
      console.warn('status is undefined');
      return;
    }
    update({ eventId: 213, userId: 3, userName: '윤둘', groundsDate: '', grounds: reason, paymentType: status, payment: fine });
    setOpen(false);
  };

  const participantList = data?.content.nicknameList.map((participant) => ({ title: participant })) || [];

  const statusList: { title: PaymentType }[] = [{ title: '미납' }, { title: '완납' }, { title: '확인필요' }];

  return (
    <Modal.Frame width="448px" height={type === 'create' ? '466px' : '412px'} onClick={() => setOpen(false)}>
      <Modal.Header onClick={() => setOpen(false)}>{type === 'create' ? '내역 추가하기' : '상세 내역 수정'}</Modal.Header>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Style.Row>
          <Label title="팀원" width="32px">
            <DropBox boxWidth="148px" width={304} setType={setMember} type={member} dropDownList={participantList} direction="right" />
          </Label>
          <Label title="납부여부" width="64px">
            <DropBox color="white" boxWidth="112px" width={112} setType={setStatus} type={status} dropDownList={statusList} />
          </Label>
        </Style.Row>
        <Style.Row>
          <Label title="금액" width="32px">
            <Style.Input type="string" value={changeNumberToMoney(fine)} onKeyDown={onChangeFine} style={{ height: '32px' }} />
          </Label>
          <Label title="날짜" width="32px">
            <DropBox color="white" boxWidth="138px" width={138} setType={setMember} type={member} dropDownList={participantList} />
          </Label>
        </Style.Row>
        <Label title="사유" width="32px">
          <Style.TextArea maxLength={65} onChange={onChangeReason} defaultValue={reason} value={reason} placeholder="내용을 입력해주세요.">
            {reason}
          </Style.TextArea>
          <Style.Length>{reason.length}/65</Style.Length>
        </Label>
        <Modal.Footer flexDirection="column">
          <Button
            color="black"
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
            <Button color="white" width="100%" height="42px" leftIcon={SYSTEM.PLUS_GRAY} onClick={() => createDetail('continue')}>
              계속해서 추가하기
            </Button>
          )}
        </Modal.Footer>
      </div>
    </Modal.Frame>
  );
};
