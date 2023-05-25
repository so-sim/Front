import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { CircleButtonList, CircleDropButton } from '@/components/DetailFine';
import { useGroupDetail } from '@/queries/Group';
import { userState } from '@/store/userState';

import { STATUS_LIST } from '@/constants/Detail';
import * as Style from './styles';
import { EventInfo } from '@/types/event';

interface DropDownWrapperProps {
  detail: EventInfo;
  openButtonListId: number;
  setOpenButtonListId: Dispatch<SetStateAction<number>>;
}

const DropDownWrapper = ({ detail, openButtonListId, setOpenButtonListId }: DropDownWrapperProps) => {
  const { eventId, paymentType, userId } = detail;
  const user = useRecoilValue(userState);
  const { groupId } = useParams();
  const { data } = useGroupDetail(Number(groupId));

  const isAdmin = data?.content.isAdmin;
  const isOwn = userId === user.userId;
  const isSelectedEvent = openButtonListId === eventId;

  const hasPermissionOfHover = isAdmin || (!isAdmin && isOwn && paymentType === 'non');
  const hasPermissionOfChangePaymentType = hasPermissionOfHover && isSelectedEvent;

  const handleCircleDropButton = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isSelectedEvent && hasPermissionOfHover) {
      setOpenButtonListId(eventId);
    }
  };

  return (
    <Style.DropDownWrapper isValid={hasPermissionOfHover} onClick={handleCircleDropButton}>
      {hasPermissionOfChangePaymentType ? (
        <CircleButtonList
          isOwn={isOwn}
          setOpenButtonListId={setOpenButtonListId}
          isAdmin={data?.content.isAdmin || false}
          status={paymentType}
          statusList={STATUS_LIST}
          eventId={eventId}
        />
      ) : (
        <CircleDropButton status={paymentType} isAdmin={data?.content.isAdmin} />
      )}
    </Style.DropDownWrapper>
  );
};
export default DropDownWrapper;
