import { GA } from '@/constants/GA';
import { PaymentType } from '@/types/event';
import { getStatusText } from './status';

const STATUS_LIST: { title: PaymentType; id?: string }[] = [{ title: '미납', id: GA.NON.SIDE_BUTTON }, { title: '완납', id: GA.FULL.SIDE_BUTTON }, { title: '확인필요' }];

export const getAdminDropdownStatusList = (paymentType: PaymentType) => {
  return STATUS_LIST.filter((status) => {
    if (status.title === '확인필요') return false;
    if (paymentType === 'con') return true;

    return status.title !== getStatusText(paymentType);
  });
};

export const getOwnDropdownStatusList = (paymentType: PaymentType) => {
  return STATUS_LIST.filter((status) => paymentType === 'non' && status.title === '확인필요');
};
