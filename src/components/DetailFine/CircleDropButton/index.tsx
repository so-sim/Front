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
  const getStatusId = (status: ServerPaymentType) => {
    switch (status) {
      case 'con':
        if (isOwn) {
          return 'confirming_list';
        }
        return '';
      case 'non':
        return 'nonpayment_list';
      case 'full':
        return 'fullpayment_list';
    }
  };

  return (
    <Style.StatusButton status={status} id={getStatusId(status)}>
      <Style.Text>{statusText(isAdmin, isOwn, status, originStatus)}</Style.Text>
      <Style.Icon>{getStatusIcon(status)}</Style.Icon>
    </Style.StatusButton>
  );
};
export default CircleDropButton;
