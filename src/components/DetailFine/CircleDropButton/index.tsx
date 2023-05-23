import { ServerPaymentType } from '@/types/event';
import { getStatusIcon } from '@/utils/getStatusIcon';
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

  const getTextByStatus = (isOwn: boolean, status: ServerPaymentType): string => {
    if (status === 'con') {
      if (isAdmin) return '확인필요';
      return originStatus === 'non' && isOwn ? '확인요청' : '확인중';
    }
    if (status === 'non') return '미납';
    if (status === 'full') return '완납';
    return '';
  };

  return (
    <Style.StatusButton status={status} id={getStatusId(status)}>
      <Style.Text>{getTextByStatus(isOwn, status)}</Style.Text>
      <Style.Icon>{getStatusIcon(status)}</Style.Icon>
    </Style.StatusButton>
  );
};
export default CircleDropButton;
