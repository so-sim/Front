import { useUpdateDetailStatus } from '@/queries/Detail/useUpdateDetailStatus';
import { PaymentType } from '@/types/event';
import { CircleDropButton, CircleDropButtonProps } from '../CircleDropButton';
import * as Style from './styles';

interface CircleButtonListProps extends CircleDropButtonProps {
  statusList: PaymentType[];
  eventId: number;
}

export const CircleButtonList = ({ status, statusList, eventId }: CircleButtonListProps) => {
  const newStatusList = [status, ...statusList.filter((element) => element !== status)];
  const { mutate } = useUpdateDetailStatus();

  const updateStatus = (paymentType: PaymentType) => {
    if (status != paymentType) {
      mutate({ paymentType, eventId });
    }
  };

  return (
    <Style.CircleButtonList>
      {newStatusList.map((paymentType) => {
        return (
          <Style.CircleButtonBox key={paymentType} onClick={() => updateStatus(paymentType)}>
            <CircleDropButton status={paymentType} />
          </Style.CircleButtonBox>
        );
      })}
    </Style.CircleButtonList>
  );
};
