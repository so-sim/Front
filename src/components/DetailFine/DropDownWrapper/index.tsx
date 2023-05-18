import { useGroupDetail } from '@/queries/Group';
import { userState } from '@/store/userState';
import { EventInfo, PaymentType, ServerPaymentType } from '@/types/event';
import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CircleButtonList, CircleDropButton } from '@/components/DetailFine';
import * as Style from './styles';
import { RefactorPayType } from '../DetailList';

interface DropDownWrapperProps {
  detail: RefactorPayType;
  openListEventId: number;
  setOpenListEventId: Dispatch<SetStateAction<number>>;
}

const DropDownWrapper = ({ detail, openListEventId, setOpenListEventId }: DropDownWrapperProps) => {
  const { eventId, paymentType, userId } = detail;
  const statusList: ServerPaymentType[] = ['non', 'con', 'full'];
  const { groupId } = useParams();

  const { data } = useGroupDetail(Number(groupId));
  const user = useRecoilValue(userState);

  const hasPermissionWhenHover = data?.content.isAdmin || (!data?.content.isAdmin && detail.userId === user.userId && detail.paymentType === 'non');

  const hasPermissionOfChangePaymentType =
    (data?.content.isAdmin && openListEventId === eventId) ||
    (!data?.content.isAdmin && detail.userId === user.userId && detail.paymentType === 'non' && openListEventId === eventId);

  const handleCircleDropButton = (e: MouseEvent) => {
    if (hasPermissionWhenHover) {
      setOpenListEventId(eventId);
      e.stopPropagation();
    }
  };

  return (
    <Style.DropDownWrapper isValid={hasPermissionWhenHover} onClick={handleCircleDropButton}>
      {hasPermissionOfChangePaymentType ? (
        <CircleButtonList
          isOwn={user.userId === userId}
          isAdmin={data?.content.isAdmin || false}
          setOpenListEventId={setOpenListEventId}
          status={paymentType}
          statusList={statusList}
          eventId={eventId}
        />
      ) : (
        <CircleDropButton status={paymentType} isAdmin={data?.content.isAdmin} />
      )}
    </Style.DropDownWrapper>
  );
};
export default DropDownWrapper;
