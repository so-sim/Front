import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useUpdateDetailStatus } from '@/queries/Detail/useUpdateDetailStatus';
import { Situation } from '@/types/event';
import { pushDataLayerByStatus } from '@/utils/pushDataLayer';
import { Dispatch, SetStateAction } from 'react';
import CircleDropButton, { CircleDropButtonProps } from '../CircleDropButton';
import * as Style from './styles';

interface Props extends CircleDropButtonProps {
  isOwn: boolean;
  eventId: number;
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

const SITUATION_LIST: Situation[] = ['미납', '확인중', '완납'];

const CircleButtonList = ({ setOpenButtonListId, isOwn, situation, eventId, isAdmin = false }: Props) => {
  const adminStatusList: Situation[] = [
    situation,
    ...SITUATION_LIST.filter((element) => {
      if (situation === '확인중') return element !== situation;

      return element !== situation && element !== '확인중';
    }),
  ];

  const userStatusList: Situation[] = situation === '미납' ? [situation, '확인중'] : [];

  const dropdownList: Situation[] = isAdmin ? adminStatusList : userStatusList;

  const onSuccessUpdateStatus = (buttonSituation: Situation) => {
    cancelUpdateStatus();
    pushDataLayerByStatus(isAdmin, buttonSituation);
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccessUpdateStatus);
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const updateStatus = async (buttonSituation: Situation) => {
    mutateDetailStatus({ situation: buttonSituation, eventId });
  };

  const cancelUpdateStatus = () => {
    setOpenButtonListId(0);
    closeConfirmModal();
  };

  const handleCircleButtonList = (buttonSituation: Situation) => {
    if (buttonSituation === situation) return cancelUpdateStatus();

    openConfirmModal({
      type: 'CHANGE_STATUS',
      confirm: () => updateStatus(buttonSituation),
      cancel: cancelUpdateStatus,
      id: getGATrigger(buttonSituation),
    });
  };

  return (
    <Style.CircleButtonList>
      {dropdownList.map((buttonSituation) => {
        return (
          <Style.CircleButtonBox key={buttonSituation} onClick={() => handleCircleButtonList(buttonSituation)}>
            <CircleDropButton situation={buttonSituation} isAdmin={isAdmin} isOwn={isOwn} originStatus={situation} />
          </Style.CircleButtonBox>
        );
      })}
    </Style.CircleButtonList>
  );
};

export default CircleButtonList;
