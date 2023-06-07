import { ClientEventInfo, PaymentType } from '@/types/event';
import { convertFromPriceFormat } from '@/utils/convertPriceFormat';

type Action =
  | { type: 'USER_NAME'; userName: string }
  | { type: 'GROUNDS'; grounds: string }
  | { type: 'GROUNDS_DATE'; groundsDate: string }
  | { type: 'PAYMENT'; payment: string }
  | { type: 'PAYMENT_TYPE'; paymentType: PaymentType }
  | { type: 'INIT'; initialData: ClientEventInfo };

export const selectedDataReducer = (state: ClientEventInfo, actions: Action) => {
  switch (actions.type) {
    case 'USER_NAME':
      const { userName } = actions;
      return { ...state, userName };
    case 'GROUNDS':
      const { grounds } = actions;
      if (grounds.length > 65) return state;

      return { ...state, grounds };
    case 'GROUNDS_DATE':
      const { groundsDate } = actions;
      return { ...state, groundsDate };
    case 'PAYMENT':
      const { payment } = actions;
      if (payment.length > 8) return state;

      const convertPayment = convertFromPriceFormat(payment);
      if (!isNaN(convertPayment)) return { ...state, payment: convertPayment };
      return state;
    case 'PAYMENT_TYPE':
      const { paymentType } = actions;
      return { ...state, paymentType };
    case 'INIT':
      const { initialData } = actions;
      return { ...state, initialData };
    default:
      throw new Error('정의되지 않은 타입입니다.');
  }
};
