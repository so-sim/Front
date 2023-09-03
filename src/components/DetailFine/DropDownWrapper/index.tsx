import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

import { CircleButtonList, CircleDropButton } from '@/components/DetailFine';

import * as Style from './styles';
import { SelectedEventInfo } from '@/types/event';
import { useGetMyNikname } from '@/queries/Group/useGetMyNickname';
import useSituationList, { getClientSituationTextFromServer } from '@/hooks/useSituationList';
import { useGroupDetail } from '@/queries/Group';
import { GA } from '@/constants/GA';
import { SITUATION_CODE } from './CircleDropButton';
import { pushDataLayer } from '@/utils/pushDataLayer';

interface Props {
  detail: SelectedEventInfo;
  openButtonListId: number;
  setOpenButtonListId: Dispatch<SetStateAction<number>>;
}

const DropDownWrapper = ({ detail, openButtonListId, setOpenButtonListId }: Props) => {
  const { eventId, situation, nickname } = detail;
  const { groupId } = useParams();

  const { data: group } = useGroupDetail(Number(groupId));
  const { data: myNickname } = useGetMyNikname(Number(groupId));
  const { convertSituationToText } = useSituationList(situation);

  const isAdmin = group?.content.isAdmin;
  const isOwn = nickname === myNickname?.content.nickname;
  const isSelectedEvent = openButtonListId === eventId;

  const hasPermissionOfHover = isAdmin || (!isAdmin && isOwn && situation === '미납');

  const hasPermissionOfChangePaymentType = hasPermissionOfHover && isSelectedEvent;

  const handleCircleDropButton = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isSelectedEvent && hasPermissionOfHover) {
      setOpenButtonListId(eventId);
      //Todo: 여기만 왜 안 되는지 찾아보기 (stopPropagation인가?)
      pushDataLayer('gtm.click', { 'gtm.element': GA[SITUATION_CODE[situation]].LIST_BUTTON });
    }
  };

  return (
    <Style.DropDownWrapper isValid={hasPermissionOfHover} onClick={handleCircleDropButton}>
      {hasPermissionOfChangePaymentType ? (
        <CircleButtonList //
          setOpenButtonListId={setOpenButtonListId}
          isAdmin={isAdmin}
          isOwn={isOwn}
          situation={situation}
          eventId={eventId}
        />
      ) : (
        <CircleDropButton situation={situation} origin={situation} isNoAuthority={!hasPermissionOfHover} />
      )}
    </Style.DropDownWrapper>
  );
};
export default DropDownWrapper;
