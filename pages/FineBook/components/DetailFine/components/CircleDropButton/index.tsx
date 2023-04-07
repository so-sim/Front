import { PaymentType } from '@/types/event';
import { getStatusCode, getStatusIcon, getStatusText } from '@/utils/getStatusIcon';
import * as Style from './styles';

export interface CircleDropButtonProps {
  status: PaymentType;
  isAdmin?: boolean;
}

export const CircleDropButton = ({ status, isAdmin = false }: CircleDropButtonProps) => {
  const STATUS = getStatusText(status);

  const getStatusId = (status: PaymentType) => {
    switch (status) {
      case '확인요청':
        return 'confirming_list';
      case '미납':
        return 'nonpayment_list';
      case '완납':
        return 'fullpayment_list';
      default:
        return '';
    }
  };

  return (
    <Style.StatusButton status={getStatusText(getStatusCode(STATUS))} id={getStatusId(status)}>
      <Style.Text>{status === 'con' && !isAdmin ? '확인중' : STATUS}</Style.Text>
      <Style.Icon>{getStatusIcon(STATUS)}</Style.Icon>
    </Style.StatusButton>
  );
};
