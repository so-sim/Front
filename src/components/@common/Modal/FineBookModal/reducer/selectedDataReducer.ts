import { SelectedEventInfo, Ground } from '@/types/event';
import { Situation } from '@/types/event';
import { convertFromPriceFormat } from '@/utils/convertFormat';

type Action =
  | { type: 'INIT'; initialData: Partial<SelectedEventInfo> }
  | { type: 'NICKNAME'; nickname: string }
  | { type: 'SITUATION'; situation: Situation }
  | { type: 'AMOUNT'; amount: string }
  | { type: 'DATE'; date: string }
  | { type: 'GROUND'; ground: Ground }
  | { type: 'MEMO'; memo: string };

// memo, amount에서 오류 발생
export const selectedDataReducer = (state: SelectedEventInfo, actions: Action) => {
  switch (actions.type) {
    case 'INIT':
      const { initialData } = actions;
      return { ...state, ...initialData };
    case 'NICKNAME':
      const { nickname } = actions;
      return { ...state, nickname };
    case 'SITUATION':
      const { situation } = actions;
      return { ...state, situation };
    case 'AMOUNT':
      const { amount } = actions;
      const convertPayment = convertFromPriceFormat(amount);

      if (amount.length > 8) return state;

      if (convertPayment > 1000000) return state;

      if (!isNaN(convertPayment)) return { ...state, amount: convertPayment };
      return state;
    case 'DATE':
      const { date } = actions;
      return { ...state, date };
    case 'GROUND':
      const { ground } = actions;
      return { ...state, ground };
    case 'MEMO':
      const { memo } = actions;
      if (memo.length > 65) return state;

      return { ...state, memo };

    default:
      throw new Error('정의되지 않은 타입입니다.');
  }
};
