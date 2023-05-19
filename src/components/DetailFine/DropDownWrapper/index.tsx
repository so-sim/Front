import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { CircleButtonList, CircleDropButton } from '@/components/DetailFine';
import { useGroupDetail } from '@/queries/Group';
import { userState } from '@/store/userState';

import { STATUS_LIST } from '@/constants/Detail';
import { RefactorPayType } from '../DetailList';
import * as Style from './styles';

interface DropDownWrapperProps {
  detail: RefactorPayType;
  openListEventId: number;
  setOpenListEventId: Dispatch<SetStateAction<number>>;
}

const DropDownWrapper = ({ detail, openListEventId, setOpenListEventId }: DropDownWrapperProps) => {
  const { eventId, paymentType, userId } = detail;
  const { groupId } = useParams();

  const { data } = useGroupDetail(Number(groupId));
  const user = useRecoilValue(userState);

  const hasPermissionOfHover = data?.content.isAdmin || (!data?.content.isAdmin && userId === user.userId && detail.paymentType === 'non');

  const hasPermissionOfChangePaymentType =
    (data?.content.isAdmin && openListEventId === eventId) || (!data?.content.isAdmin && userId === user.userId && detail.paymentType === 'non' && openListEventId === eventId);

  const handleCircleDropButton = (e: MouseEvent) => {
    if (hasPermissionOfHover) {
      setOpenListEventId(eventId);
      e.stopPropagation();
    }
  };

  return (
    <Style.DropDownWrapper isValid={hasPermissionOfHover} onClick={handleCircleDropButton}>
      {hasPermissionOfChangePaymentType ? (
        <CircleButtonList
          isOwn={user.userId === userId}
          isAdmin={data?.content.isAdmin || false}
          setOpenListEventId={setOpenListEventId}
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
