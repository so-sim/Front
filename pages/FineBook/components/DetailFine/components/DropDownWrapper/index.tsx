import { EvnetInfo, PaymentType } from '@/types/event';
import React, { Dispatch, SetStateAction } from 'react';
import { CircleButtonList } from '../CircleButtonList';
import { CircleDropButton } from '../CircleDropButton';
import * as Style from './styles';

interface DropDownWrapperProps {
  openListEventId: number;
  setOpenListEventId: Dispatch<SetStateAction<number>>;
  detail: EvnetInfo;
}

export const DropDownWrapper = ({ openListEventId, setOpenListEventId, detail }: DropDownWrapperProps) => {
  const { eventId, paymentType } = detail;
  const statusList: PaymentType[] = ['미납', '확인필요', '완납'];

  return (
    <Style.DropDownWrapper
      onClick={(e) => {
        setOpenListEventId((prev) => {
          if (prev != 0 && prev === openListEventId) return 0;
          return eventId;
        });
        e.stopPropagation();
      }}
    >
      {openListEventId === eventId ? <CircleButtonList status={paymentType} statusList={statusList} eventId={eventId} /> : <CircleDropButton status={paymentType} />}
    </Style.DropDownWrapper>
  );
};
