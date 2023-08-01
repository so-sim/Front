import { Situation } from '@/types/event';

export interface DetailFilter {
  groupId: number;
  nickname: string;
  situation: Situation | '';
  page: number;
  size: number;
}
