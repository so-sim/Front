import { ServerPaymentType } from '@/types/event';

export const STATUS_LIST: ServerPaymentType[] = ['non', 'con', 'full'];

export const DETAIL = {
  DELETE: {
    title: '내역 삭제',
    description: `벌금 내역을 삭제하시겠습니까? \n 삭제된 내역은 복구가 불가능합니다.`,
  },
};

export const DETAIL_STATUS = {
  CHANGE: {
    title: '납부여부 변경',
    description: '납부여부를 변경하시겠습니까?',
  },
  REQUEST: {
    title: '납부여부 변경',
    description: `총무에게 확인 요청을 보내시겠습니까? \n 요청 후 변경이 불가능합니다.`,
  },
};
