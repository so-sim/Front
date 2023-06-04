import DropBox from '@/components/@common/DropBox';
import { CalendarDropBox } from '@/components/@common/DropBox/CalendarDropBox';
import Label from '@/components/@common/Label';
import { GA } from '@/constants/GA';
import { useParticipantList } from '@/queries/Group';
import { ClientEventInfo, PaymentType } from '@/types/event';
import { convertToPriceFormat } from '@/utils/convertPriceFormat';
import { getStatusText } from '@/utils/status';
import React from 'react';
import { useParams } from 'react-router-dom';
import * as Style from '../styles';

const STATUS_LIST: { title: PaymentType; id?: string }[] = [
  { title: '미납', id: GA.NON.LIST_MODAL },
  { title: '완납', id: GA.FULL.LIST_MODAL },
];

type Props = {
  dispatch: any;
  selectData: ClientEventInfo;
};

const FormFileds = ({ selectData, dispatch }: Props) => {
  const { groupId } = useParams();
  const { data: participants } = useParticipantList(Number(groupId));

  const admin = { title: participants?.content.adminNickname as string };
  const participantList = participants?.content.memberList.map(({ nickname }) => ({ title: nickname })) || [];
  const memberList = [admin, ...participantList];

  const onChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'PAYMENT', payment: e.target.value });
  };

  const onChangeGrounds = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'GROUNDS', grounds: e.target.value });
  };

  const onChangeGroundsDate = (groundsDate: string) => {
    dispatch({ type: 'GROUNDS_DATE', groundsDate });
  };

  const onChangeUserName = (userName: string) => {
    dispatch({ type: 'USER_NAME', userName });
  };

  const onChanePaymentType = (paymentType: PaymentType) => {
    dispatch({ type: 'PAYMENT_TYPE', paymentType });
  };
  return (
    <>
      <Style.Row>
        <Label title="팀원" width="32px" margin="0px">
          <DropBox boxWidth="146px" width={304} setType={onChangeUserName} type={selectData.userName} dropDownList={memberList} direction="right" />
        </Label>
        <Label title="납부여부" width="56px" margin="0px">
          <DropBox
            color="white"
            boxWidth="110px"
            width={112}
            setType={onChanePaymentType}
            type={getStatusText(selectData.paymentType)}
            dropDownList={STATUS_LIST.filter((paymentType) => paymentType.title !== getStatusText(selectData.paymentType))}
          />
        </Label>
      </Style.Row>
      <Style.Row>
        <Label title="금액" width="32px" margin="0px">
          <Style.Input type="string" value={convertToPriceFormat(selectData.payment)} onChange={onChangePayment} style={{ height: '32px' }} />
        </Label>
        <Label title="날짜" width="32px" margin="0px">
          <CalendarDropBox type={selectData.groundsDate} setType={onChangeGroundsDate} color="white" />
        </Label>
      </Style.Row>
      <Label title="사유" width="32px" margin="0px">
        <Style.TextArea maxLength={65} onChange={onChangeGrounds} defaultValue={selectData.grounds} placeholder="내용을 입력해주세요." />
        <Style.Length>{selectData.grounds.length}/65</Style.Length>
      </Label>
    </>
  );
};

export default FormFileds;
