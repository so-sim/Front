import { ConfirmModal } from '@/components/@common/Modal/ConfirmModal';
import { DETAIL_STATUS } from '@/constants/Detail';
import { useUpdateDetailStatus } from '@/queries/Detail/useUpdateDetailStatus';
import { ServerPaymentType } from '@/types/event';
import { pushDataLayerByStatus } from '@/utils/pushDataLayer';
import { Dispatch, SetStateAction, useState } from 'react';
import CircleDropButton, { CircleDropButtonProps } from '../CircleDropButton';
import * as Style from './styles';

interface CircleButtonListProps extends CircleDropButtonProps {
  isOwn: boolean;
  statusList: ServerPaymentType[];
  eventId: number;
  isAdmin: boolean;
  setOpenButtonListId: Dispatch<SetStateAction<number>>;
}

const getGATrigger = (newStatus: ServerPaymentType): string => {
  const id = {
    con: 'confirming_list_modal',
    full: 'fullpayment_list_modal',
    non: '',
  };

  return id[newStatus];
};

const CircleButtonList = ({ setOpenButtonListId, isOwn, status, statusList, eventId, isAdmin }: CircleButtonListProps) => {
  const adminStatusList: ServerPaymentType[] = [
    status,
    ...statusList.filter((element) => {
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
  const [newStatus, setNewStatus] = useState<ServerPaymentType>('non');
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  const updateStatus = (paymentType: ServerPaymentType) => {
    if (status != paymentType) {
      mutateDetailStatus({ paymentType, eventId });
    }
  };

  const cancelUpdateStatus = () => {
    setOpenButtonListId(0);
  };

  const handleCircleButtonList = (paymentType: ServerPaymentType) => {
    if (paymentType === status) {
      return cancelUpdateStatus();
    }
    setShowUpdateStatusModal(true);
    setNewStatus(paymentType);
  };

  return (
    <>
      <Style.CircleButtonList>
        {dropdownList.map((paymentType) => {
          return (
            <Style.CircleButtonBox key={paymentType} onClick={() => handleCircleButtonList(paymentType)}>
              <CircleDropButton status={paymentType} isAdmin={isAdmin} isOwn={isOwn} originStatus={status} />
            </Style.CircleButtonBox>
          );
        })}
      </Style.CircleButtonList>
      {showUpdateStatusModal && (
        <ConfirmModal
          id={getGATrigger(newStatus)}
          modalHandler={cancelUpdateStatus}
          title={DETAIL_STATUS.CHANGE.title}
          description={DETAIL_STATUS.CHANGE.description}
          cancel={{ text: '취소', onClick: cancelUpdateStatus }}
          confirm={{ text: '변경하기', onClick: () => updateStatus(newStatus) }}
        />
      )}
    </>
  );
};

export default CircleButtonList;
