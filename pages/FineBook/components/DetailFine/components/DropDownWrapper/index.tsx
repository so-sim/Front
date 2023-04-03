import { EventInfo, PaymentType } from '@/types/event';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CircleButtonList } from '../CircleButtonList';
import { CircleDropButton } from '../CircleDropButton';
import * as Style from './styles';

interface DropDownWrapperProps {
  detail: EventInfo;
}

export const DropDownWrapper = ({ detail }: DropDownWrapperProps) => {
  const { eventId, paymentType } = detail;
  const statusList: PaymentType[] = ['미납', '확인필요', '완납'];
  const [openListEventId, setOpenListEventId] = useState(0);
  console.log('openListEventId:', openListEventId);

  return (
    <Style.DropDownWrapper
      onClick={(e) => {
        setOpenListEventId(eventId);
        e.stopPropagation();
      }}
    >
      {openListEventId === eventId ? (
        <CircleButtonList setOpenListEventId={setOpenListEventId} status={paymentType} statusList={statusList} eventId={eventId} />
      ) : (
        <CircleDropButton status={paymentType} />
      )}
    </Style.DropDownWrapper>
  );
};
