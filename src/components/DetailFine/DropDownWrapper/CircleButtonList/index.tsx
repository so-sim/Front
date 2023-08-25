import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useUpdateDetailStatus } from '@/queries/Detail/useUpdateDetailStatus';
import { Situation } from '@/types/event';
import { pushDataLayer, pushDataLayerByStatus } from '@/utils/pushDataLayer';
import { Dispatch, SetStateAction } from 'react';
import CircleDropButton from '../CircleDropButton';
import useSituationList from '@/hooks/useSituationList';
import * as Style from './styles';

interface Props {
  isAdmin?: boolean;
  eventId: number;
  situation: Situation;
  setOpenButtonListId: Dispatch<SetStateAction<number>>;
}

const getGATrigger = (situation: Situation): string => {
  const id = {
    확인중: GA.CON.LIST_MODAL,
    완납: GA.FULL.LIST_MODAL,
    미납: '',
  };

  return id[situation];
};

const CircleButtonList = ({ setOpenButtonListId, situation, eventId, isAdmin = false }: Props) => {
  const onSuccessUpdateStatus = (buttonSituation: Situation) => {
    cancelUpdateStatus();
    pushDataLayerByStatus(isAdmin, buttonSituation);
    buttonSituation === '미납' && pushDataLayer('nonpayment', { route: 'list' });
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccessUpdateStatus);
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();
  const { dropdownList, convertTextToSituation } = useSituationList(situation);

  const updateStatus = async (buttonSituation: Situation) => {
    mutateDetailStatus({ situation: buttonSituation, eventIdList: [eventId] });
  };

  const cancelUpdateStatus = () => {
    setOpenButtonListId(0);
    closeConfirmModal();
  };

  const handleCircleButtonList = (buttonSituation: Situation) => {
    if (buttonSituation === situation) return cancelUpdateStatus();

    openConfirmModal({
      type: isAdmin ? 'CHANGE_STATUS_ADMIN' : 'CHANGE_STATUS',
      confirm: () => updateStatus(buttonSituation),
      cancel: cancelUpdateStatus,
      id: getGATrigger(buttonSituation),
    });
  };

  return (
    <Style.CircleButtonList>
      {dropdownList.map((buttonSituation) => {
        const convertedSituation = convertTextToSituation(buttonSituation);

        return (
          <Style.CircleButtonBox key={buttonSituation} onClick={() => handleCircleButtonList(convertedSituation)}>
            <CircleDropButton situation={convertedSituation} origin={situation} />
          </Style.CircleButtonBox>
        );
      })}
    </Style.CircleButtonList>
  );
};

export default CircleButtonList;
