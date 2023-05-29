import { ServerPaymentType } from '@/types/event';
import { KeyValueObject } from '@/types/global';

export const pushDataLayer = (event: string, data: KeyValueObject) => {
  window.dataLayer.push({ event, ...data });
};

export const pushDataLayerByStatus = (isAdmin: boolean, paymentType: ServerPaymentType) => {
  if (isAdmin === false && paymentType === 'con') {
    pushDataLayer('confirming', { route: 'list' });
  }
  if (isAdmin === true && paymentType === 'full') {
    pushDataLayer('fullpayment', { route: 'list' });
  }
};
