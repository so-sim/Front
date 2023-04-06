import { PaymentType } from '@/types/event';
import { getStatusIcon, getStatusText } from '@/utils/getStatusIcon';
import * as Style from './styles';

export interface CircleDropButtonProps {
  status: PaymentType;
  isAdmin?: boolean;
}

export const CircleDropButton = ({ status, isAdmin = false }: CircleDropButtonProps) => {
  const STATUS = getStatusText(status);

  return (
    <Style.StatusButton status={STATUS}>
      <Style.Text>{status === 'con' && !isAdmin ? '확인중' : STATUS}</Style.Text>
      <Style.Icon>{getStatusIcon(STATUS)}</Style.Icon>
    </Style.StatusButton>
  );
};
