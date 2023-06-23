import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { CircleButtonList, CircleDropButton } from '@/components/DetailFine';
import { useGroupDetail } from '@/queries/Group';
import { userState } from '@/store/userState';

import * as Style from './styles';
import { SelectedEventInfo } from '@/types/event';

interface Props {
  detail: SelectedEventInfo;
  openButtonListId: number;
  setOpenButtonListId: Dispatch<SetStateAction<number>>;
}

const DropDownWrapper = ({ detail, openButtonListId, setOpenButtonListId }: Props) => {
  const { eventId, situation, nickname } = detail;
  const user = useRecoilValue(userState);
  const { groupId } = useParams();
  const { data } = useGroupDetail(Number(groupId));

  const isAdmin = data?.content.isAdmin;
  const isOwn = nickname === 'user.userId';
  const isSelectedEvent = openButtonListId === eventId;

  const hasPermissionOfHover = isAdmin || (!isAdmin && isOwn && situation === '미납');
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
        <CircleButtonList isOwn={isOwn} setOpenButtonListId={setOpenButtonListId} isAdmin={isAdmin} situation={situation} eventId={eventId} />
      ) : (
        <CircleDropButton situation={situation} isAdmin={isAdmin} />
      )}
    </Style.DropDownWrapper>
  );
};
export default DropDownWrapper;
