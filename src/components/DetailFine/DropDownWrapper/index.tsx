import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
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
  isOpen: boolean;
  setOpenButtonListId: Dispatch<SetStateAction<number>>;
}

const DropDownWrapper = ({ detail, isOpen, setOpenButtonListId }: DropDownWrapperProps) => {
  const { eventId, paymentType, userId } = detail;
  const user = useRecoilValue(userState);
  const { groupId } = useParams();
  const { data } = useGroupDetail(Number(groupId));

  const [showCircleButtonList, setShowCircleButtonList] = useState(false);

  const isOwn = userId === user.userId;

  const hasPermissionOfHover =
    data?.content.isAdmin || //
    (!data?.content.isAdmin && isOwn && paymentType === 'non');

  const hasPermissionOfChangePaymentType =
    showCircleButtonList &&
    isOpen && //
    (data?.content.isAdmin || //
      (!data?.content.isAdmin && isOwn && paymentType === 'non'));

  const handleCircleDropButton = (e: MouseEvent) => {
    if (hasPermissionOfHover) {
      setShowCircleButtonList(true);
      setOpenButtonListId(eventId);
      e.stopPropagation();
    }
  };

  const cancelUpdateStatus = () => {
    setShowCircleButtonList(false);
  };

  // 왜 다른 곳 클릭하면 잘 닫히는데, 다른 엘리먼트의 같은 요소를 클릭하면 작동이 안 되는 거지??
  // isOpen을 제거할 수 없음..
  useEffect(() => {
    window.addEventListener('click', cancelUpdateStatus);
    return () => {
      window.removeEventListener('click', cancelUpdateStatus);
    };
  }, []);

  return (
    <Style.DropDownWrapper isValid={hasPermissionOfHover} onClick={handleCircleDropButton}>
      {hasPermissionOfChangePaymentType ? (
        <CircleButtonList
          setShowCircleButtonList={setShowCircleButtonList}
          isOwn={isOwn}
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
