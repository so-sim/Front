import { CIRCLE_DROP } from '@/assets/icons/CircleDrop';
import { PaymentType } from '@/types/event';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case '미납':
      return CIRCLE_DROP.RED;
    case '확인필요':
      return CIRCLE_DROP.YELLOW;
    case '완납':
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

export const getStatusCode = (status: PaymentType) => {
  switch (status) {
    case '미납':
      return 'non';
    case '확인필요':
    case '확인요청':
    case '확인필요':
      return 'con';
    case '완납':
      return 'full';
    default:
      return status;
  }
};
