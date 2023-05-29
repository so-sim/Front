import { GA } from '@/constants/GA';
import { ServerPaymentType } from '@/types/event';
import { getStatusIcon, statusText } from '@/utils/status';
import * as Style from './styles';

export interface CircleDropButtonProps {
  status: ServerPaymentType;
  isAdmin?: boolean;
  isOwn?: boolean;
  originStatus?: ServerPaymentType;
}

const CircleDropButton = ({ status, isAdmin = false, isOwn = false, originStatus }: CircleDropButtonProps) => {
  const PAYMENT_TYPE = status.toUpperCase() as 'NON' | 'FULL' | 'CON';

  return (
    <Style.StatusButton status={status} id={GA[PAYMENT_TYPE].LIST_BUTTON}>
      <Style.Text>{statusText(isAdmin, isOwn, status, originStatus)}</Style.Text>
      <Style.Icon>{getStatusIcon(status)}</Style.Icon>
    </Style.StatusButton>
  );
};
export default CircleDropButton;
