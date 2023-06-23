import { CIRCLE_DROP } from '@/assets/icons/CircleDrop';
import { Situation } from '@/types/event';

export const getStatusIcon = (situation: Situation) => {
  switch (situation) {
    case '미납':
      return CIRCLE_DROP.RED;
    case '확인중':
      return CIRCLE_DROP.YELLOW;
    case '완납':
      return CIRCLE_DROP.BLUE;
  }
};

// export const statusText = (isAdmin: boolean, isOwn: boolean, newPaymentType: ServerPaymentType, originPaymentType?: ServerPaymentType) => {
//   if (isAdmin) {
//     const statusText = {
//       non: '미납',
//       con: '확인필요',
//       full: '완납',
//     };
//     return statusText[newPaymentType];
//   }

//   if (isOwn && originPaymentType === 'non' && newPaymentType === 'con') return '확인요청';

//   const statusText = {
//     non: '미납',
//     con: '확인중',
//     full: '완납',
//   };

//   return statusText[newPaymentType];
// };
