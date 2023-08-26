import { Situation } from '@/types/event';

export const CONVERT_SITUATION_FORMAT: { [key in Situation]: string } = {
  미납: '납부 전',
  확인중: '승인대기',
  완납: '납부완료',
};
