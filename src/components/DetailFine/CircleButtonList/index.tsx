import { TwoButtonModal } from '@/components/@common/Modal/TwoButtonModal';
import { useUpdateDetailStatus } from '@/queries/Detail/useUpdateDetailStatus';
import { PaymentType } from '@/types/event';
import { getStatusCode, getStatusText } from '@/utils/getStatusIcon';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CircleDropButton, { CircleDropButtonProps } from '../CircleDropButton';
import * as Style from './styles';

interface CircleButtonListProps extends CircleDropButtonProps {
  statusList: PaymentType[];
  eventId: number;
  isAdmin: boolean;
  setOpenListEventId: Dispatch<SetStateAction<number>>;
}

const CircleButtonList = ({ status, statusList, eventId, setOpenListEventId, isAdmin }: CircleButtonListProps) => {
  const adminStatusList: PaymentType[] = [
    getStatusText(status),
    ...statusList.filter((element) => {
      if (status === 'con') return element !== getStatusText(status);

      return element !== getStatusText(status) && element !== '확인필요';
    }),
  ];

  const userStatusList: PaymentType[] = status === 'non' ? [getStatusText(status), '확인요청'] : [];

  const dropdownList = isAdmin ? adminStatusList : userStatusList;

  const { mutate } = useUpdateDetailStatus();
  const [newStatus, setNewStatus] = useState<PaymentType>('');
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  const updateStatus = (paymentType: PaymentType) => {
    if (status != paymentType) {
      mutate(
        { paymentType, eventId },
        {
          onSuccess: () => {
            setOpenListEventId(0);
            if (isAdmin === false && paymentType === 'con') {
              pushDataLayer('confirming', { route: 'list' });
            }
            if (isAdmin === true && paymentType === 'full') {
              pushDataLayer('fullpayment', { route: 'list' });
            }
          },
        },
      );
    }
  };

  const handleUpdateStatusModal = () => {
    setOpenListEventId(0);
    setShowUpdateStatusModal((prev) => !prev);
  };

  const handleCircleButtonList = (paymentType: PaymentType) => {
    if (paymentType !== getStatusText(status)) {
      setShowUpdateStatusModal(true);
      setNewStatus(getStatusCode(paymentType));
      return;
    }

    setOpenListEventId(0);
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
        {dropdownList.map((paymentType) => {
          return (
            <Style.CircleButtonBox key={paymentType} onClick={() => handleCircleButtonList(paymentType)}>
              <CircleDropButton status={paymentType} isAdmin={isAdmin} />
            </Style.CircleButtonBox>
          );
        })}
      </Style.CircleButtonList>
      {showUpdateStatusModal && (
        <TwoButtonModal
          id={newStatus === 'con' ? 'confirming_list_modal' : newStatus === 'full' ? 'fullpayment_list_modal' : ''}
          onClick={handleUpdateStatusModal}
          height="215px"
          title="납부여부 변경"
          description="납부여부를 변경하시겠습니까?"
          cancel={{ text: '취소', onClick: cancelUpdateStatus }}
          confirm={{ text: '변경하기', onClick: () => updateStatus(newStatus) }}
        />
      )}
    </>
  );
};

export default CircleButtonList;
