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
import { useCreateDetail } from '@/queries/Detail/useCreateDetail';
import { EvnetInfo, PaymentType } from '@/types/event';
import { useUpdateDetail } from '@/queries/Detail/useUpdateDetail';
import { useGetOneOfDetail } from '@/queries/Detail/useGetOneOfDetail';

interface ModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  eventId?: number;
}

export const FineBookModal = ({ setOpen, eventId }: ModalProps) => {
  const type = eventId ? 'update' : 'create';

  const [member, setMember] = useState('');
  const [status, setStatus] = useState<PaymentType | ''>('');

  const [reason, setReason] = useState('');

  const [fine, setFine] = useState(0);

  const onChangeFine = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const removedCommaValue = Number(value.replaceAll(',', ''));
    if (!isNaN(removedCommaValue)) setFine(removedCommaValue);
  };

  const onChangeReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 65) return;

    setReason(e.target.value);
  };

  const params = useParams();
  const { data: detail } = useGetOneOfDetail(eventId);
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

  const [detailForm, setDetailForm] = useState<Partial<EvnetInfo>>({
    userId: 0,
    userName: '',
    groundsDate: '',
    grounds: '',
    paymentType: '',
    payment: 0,
  });

  const createDetail = async (type: 'continue' | 'save') => {
    if (status == '') return;
    await create({ userId: 3, userName: member, groundsDate: '2023-03-18 23:42:43', grounds: reason, paymentType: status, payment: fine });
    if (type === 'continue') {
      initDetail();
      return;
    }
    setOpen(false);
  };

  const updateDetail = () => {
    if (status == '') return;
    update({ eventId: 213, userId: 3, userName: '윤둘', groundsDate: '', grounds: reason, paymentType: status, payment: fine });
    setOpen(false);
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
            <DropBox boxWidth="148px" width={304} setType={setMember} type={member} dropDownList={memberList} direction="right" />
          </Label>
          <Label title="납부여부" width="64px">
            <DropBox color="white" boxWidth="112px" width={112} setType={setStatus} type={status} dropDownList={statusList} />
          </Label>
        </Style.Row>
        <Style.Row>
          <Label title="금액" width="32px">
            <Style.Input type="string" value={changeNumberToMoney(fine)} onChange={onChangeFine} style={{ height: '32px' }} />
          </Label>
          <Label title="날짜" width="32px">
            <DropBox color="white" boxWidth="138px" width={138} setType={setMember} type={member} dropDownList={memberList} />
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
