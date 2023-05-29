import { CIRCLE_DROP } from '@/assets/icons/CircleDrop';
import { PaymentType, ServerPaymentType } from '@/types/event';

export const getStatusIcon = (status: ServerPaymentType) => {
  switch (status) {
    case 'non':
      return CIRCLE_DROP.RED;
    case 'con':
      return CIRCLE_DROP.YELLOW;
    case 'full':
      return CIRCLE_DROP.BLUE;
  }
};

export const getStatusText = (status: PaymentType) => {
  switch (status) {
    case 'non':
      return '미납';
    case 'con':
      return '확인필요';
    case 'full':
      return '완납';
    default:
      return status;
  }
};

export const getStatusCode = (status: Exclude<PaymentType, ''>): ServerPaymentType => {
  switch (status) {
    case '미납':
      return 'non';
    case '확인필요':
    case '확인요청':
    case '확인중':
      return 'con';
    case '완납':
      return 'full';
    default:
      return status;
  }
};

export const statusText = (isAdmin: boolean, isOwn: boolean, newPaymentType: ServerPaymentType, originPaymentType?: ServerPaymentType) => {
  if (isAdmin) {
    const statusText = {
      non: '미납',
      con: '확인필요',
      full: '완납',
    };
    return statusText[newPaymentType];
  }

  if (isOwn && originPaymentType === 'non' && newPaymentType === 'con') return '확인요청';

  const statusText = {
    non: '미납',
    con: '확인중',
    full: '완납',
  };

  return statusText[newPaymentType];
};
