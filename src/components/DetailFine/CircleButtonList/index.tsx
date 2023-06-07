import { STATUS_LIST } from '@/constants/Detail';
import { GA } from '@/constants/GA';
import useConfirmModal from '@/hooks/useConfirmModal';
import { useUpdateDetailStatus } from '@/queries/Detail/useUpdateDetailStatus';
import { ServerPaymentType } from '@/types/event';
import { pushDataLayerByStatus } from '@/utils/pushDataLayer';
import { Dispatch, SetStateAction } from 'react';
import CircleDropButton, { CircleDropButtonProps } from '../CircleDropButton';
import * as Style from './styles';

interface Props extends CircleDropButtonProps {
  isOwn: boolean;
  eventId: number;
  setOpenButtonListId: Dispatch<SetStateAction<number>>;
}

const getGATrigger = (newStatus: ServerPaymentType): string => {
  const id = {
    con: GA.CON.LIST_MODAL,
    full: GA.FULL.LIST_MODAL,
    non: '',
  };

  return id[newStatus];
};

const CircleButtonList = ({ setOpenButtonListId, isOwn, status, eventId, isAdmin = false }: Props) => {
  const adminStatusList: ServerPaymentType[] = [
    status,
    ...STATUS_LIST.filter((element) => {
      if (status === 'con') return element !== status;

      return element !== status && element !== 'con';
    }),
  ];

  const userStatusList: ServerPaymentType[] = status === 'non' ? [status, 'con'] : [];

  const dropdownList: ServerPaymentType[] = isAdmin ? adminStatusList : userStatusList;

  const onSuccessUpdateStatus = (paymentType: ServerPaymentType) => {
    cancelUpdateStatus();
    pushDataLayerByStatus(isAdmin, paymentType);
  };

  const { mutate: mutateDetailStatus } = useUpdateDetailStatus(onSuccessUpdateStatus);
  const { openConfirmModal, closeConfirmModal } = useConfirmModal();

  const updateStatus = async (paymentType: ServerPaymentType) => {
    if (status != paymentType) mutateDetailStatus({ paymentType, eventId });
  };

  const cancelUpdateStatus = () => {
    setOpenButtonListId(0);
    closeConfirmModal();
  };

  const handleCircleButtonList = (paymentType: ServerPaymentType) => {
    if (paymentType === status) {
      return cancelUpdateStatus();
    }

    openConfirmModal({
      type: 'CHANGE_STATUS',
      confirm: () => updateStatus(paymentType),
      cancel: cancelUpdateStatus,
      id: getGATrigger(paymentType),
    });
  };

  return (
    <Style.CircleButtonList>
      {dropdownList.map((paymentType) => {
        return (
          <Style.CircleButtonBox key={paymentType} onClick={() => handleCircleButtonList(paymentType)}>
            <CircleDropButton status={paymentType} isAdmin={isAdmin} isOwn={isOwn} originStatus={status} />
          </Style.CircleButtonBox>
        );
      })}
    </Style.CircleButtonList>
  );
};

export default CircleButtonList;
