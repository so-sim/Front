import { useGroupDetail } from '@/queries/Group';
import { userState } from '@/store/userState';
import { EventInfo, PaymentType } from '@/types/event';
import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CircleButtonList } from '../CircleButtonList';
import { CircleDropButton } from '../CircleDropButton';
import * as Style from './styles';

interface DropDownWrapperProps {
  detail: EventInfo;
  openListEventId: number;
  setOpenListEventId: Dispatch<SetStateAction<number>>;
}

export const DropDownWrapper = ({ detail, openListEventId, setOpenListEventId }: DropDownWrapperProps) => {
  const { eventId, paymentType } = detail;
  const statusList: PaymentType[] = ['미납', '확인필요', '완납'];
  const { groupId } = useParams();

  const { data } = useGroupDetail({ groupId: Number(groupId) });
  const user = useRecoilValue(userState);

  const isValidBeforSelect = data?.content.isAdmin || (!data?.content.isAdmin && detail.userId === user.userId && detail.paymentType === 'non');

  const isValidOpenDropdown =
    (data?.content.isAdmin && openListEventId === eventId) ||
    (!data?.content.isAdmin && detail.userId === user.userId && detail.paymentType === 'non' && openListEventId === eventId);

  const handleCircleDropButton = (e: MouseEvent) => {
    if (isValidBeforSelect) {
      setOpenListEventId(eventId);
      e.stopPropagation();
    }
  };

  console.log(openListEventId);
  return (
    <Style.DropDownWrapper isValid={isValidBeforSelect} onClick={handleCircleDropButton}>
      {isValidOpenDropdown ? (
        <CircleButtonList isAdmin={data?.content.isAdmin || false} setOpenListEventId={setOpenListEventId} status={paymentType} statusList={statusList} eventId={eventId} />
      ) : (
        <CircleDropButton status={paymentType} isAdmin={data?.content.isAdmin} />
      )}
    </Style.DropDownWrapper>
  );
};
