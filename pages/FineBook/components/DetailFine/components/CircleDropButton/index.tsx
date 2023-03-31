import { PaymentType } from '@/types/event';
import { getStatusIcon, getStatusText } from '@/utils/getStatusIcon';
import * as Style from './styles';

export interface CircleDropButtonProps {
  status: PaymentType;
}

export const CircleDropButton = ({ status }: CircleDropButtonProps) => {
  const STATUS = getStatusText(status);

  return (
    <Style.StatusButton status={STATUS}>
      <Style.Text>{STATUS}</Style.Text>
      <Style.Icon>{getStatusIcon(STATUS)}</Style.Icon>
    </Style.StatusButton>
  );
};
