import { TwoButtonModal } from '@/components/@common/Modal/TwoButtonModal';
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
  setShowCircleButtonList: Dispatch<SetStateAction<boolean>>;
}

// ga 트리거 id 얻기 위한 함수는 컴포넌트 일관적으로 상단에 위치시키는 거 어떤가요
const getGATrigger = (newStatus: ServerPaymentType): string => {
  const id = {
    con: 'confirming_list_modal',
    full: 'fullpayment_list_modal',
    non: '',
  };

  return id[newStatus];
};

const CircleButtonList = ({ setShowCircleButtonList, isOwn, status, statusList, eventId, isAdmin }: CircleButtonListProps) => {
  const adminStatusList: ServerPaymentType[] = [
    status,
    ...statusList.filter((element) => {
      if (status === 'con') return element !== status;

      return element !== status && element !== 'con';
    }),
  ];

  const userStatusList: ServerPaymentType[] = status === 'non' ? [status, 'con'] : [];

  const dropdownList: ServerPaymentType[] = isAdmin ? adminStatusList : userStatusList;

  const { mutate } = useUpdateDetailStatus();
  const [newStatus, setNewStatus] = useState<ServerPaymentType>('non');
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  const updateStatus = (isAdmin: boolean, paymentType: ServerPaymentType) => {
    if (status != paymentType) {
      mutate(
        { paymentType, eventId },
        {
          onSuccess: () => {
            setShowCircleButtonList(false);
            // 이거 GA때문에 list에서 변경하는 것과 모달에서 변경하는 것 구분지어 달라고 하셔서 여기에 배치한 거임
            pushDataLayerByStatus(isAdmin, paymentType);
          },
        },
      );
    }
  };

  const cancelUpdateStatus = () => {
    new Promise((resolve) => {
      resolve(setShowUpdateStatusModal(false));
    }).then(() => {
      setShowCircleButtonList(false);
    });
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
        <TwoButtonModal
          id={getGATrigger(newStatus)}
          onClick={cancelUpdateStatus}
          height="215px"
          title="납부여부 변경"
          description="납부여부를 변경하시겠습니까?"
          cancel={{ text: '취소', onClick: cancelUpdateStatus }}
          confirm={{ text: '변경하기', onClick: () => updateStatus(isAdmin, newStatus) }}
        />
      )}
    </>
  );
};

export default CircleButtonList;
