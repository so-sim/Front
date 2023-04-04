import { TwoButtonModal } from '@/common/Modal/TwoButtonModal';
import { useUpdateDetailStatus } from '@/queries/Detail/useUpdateDetailStatus';
import { PaymentType } from '@/types/event';
import { getStatusCode, getStatusText } from '@/utils/getStatusIcon';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CircleDropButton, CircleDropButtonProps } from '../CircleDropButton';
import * as Style from './styles';

interface CircleButtonListProps extends CircleDropButtonProps {
  statusList: PaymentType[];
  eventId: number;
  setOpenListEventId: Dispatch<SetStateAction<number>>;
}

export const CircleButtonList = ({ status, statusList, eventId, setOpenListEventId }: CircleButtonListProps) => {
  const newStatusList = [getStatusText(status), ...statusList.filter((element) => element !== getStatusText(status))];
  const { mutate } = useUpdateDetailStatus();
  const [newStatus, setNewStatus] = useState<PaymentType>('');
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  const updateStatus = (paymentType: PaymentType) => {
    if (status != paymentType) {
      mutate({ paymentType, eventId }, { onSuccess: () => setOpenListEventId(0) });
    }
  };

  const handleUpdateStatusModal = () => {
    setOpenListEventId(0);
    setShowUpdateStatusModal((prev) => !prev);
  };

  const cancelUpdateStatus = async () => {
    await setShowUpdateStatusModal(false);
    setOpenListEventId(0);
    setNewStatus('');
  };

  useEffect(() => {
    const closeButtonList = () => {
      setOpenListEventId(0);
    };

    window.addEventListener('click', closeButtonList);
    return () => {
      window.removeEventListener('click', closeButtonList);
    };
  }, []);

  return (
    <>
      <Style.CircleButtonList>
        {newStatusList.map((paymentType) => {
          return (
            <Style.CircleButtonBox
              key={paymentType}
              onClick={() => {
                if (paymentType !== getStatusText(status)) {
                  setShowUpdateStatusModal(true);
                  setNewStatus(getStatusCode(paymentType));
                } else {
                  setOpenListEventId(0);
                }
              }}
            >
              <CircleDropButton status={paymentType} />
            </Style.CircleButtonBox>
          );
        })}
      </Style.CircleButtonList>
      {showUpdateStatusModal && (
        <TwoButtonModal
          onClick={handleUpdateStatusModal}
          title="납부여부 변경"
          description="납부여부를 변경하시겠습니까?"
          cancel={{ text: '취소', onClick: cancelUpdateStatus }}
          confirm={{ text: '변경하기', onClick: () => updateStatus(newStatus) }}
        />
      )}
    </>
  );
};
