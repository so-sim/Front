import { PaymentType } from '@/types/event';
import { getStatusIcon } from '@/utils/getStatusIcon';
import * as Style from './styles';

export interface CircleDropButtonProps {
  status: PaymentType;
}

export const CircleDropButton = ({ status }: CircleDropButtonProps) => {
  return (
    <Style.StatusButton status={status}>
      <Style.Text>{status}</Style.Text>
      <Style.Icon>{getStatusIcon(status)}</Style.Icon>
    </Style.StatusButton>
  );
};
