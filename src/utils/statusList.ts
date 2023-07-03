import { GA } from '@/constants/GA';
import { Situation } from '@/types/event';

const STATUS_LIST: { title: Situation; id?: string }[] = [{ title: '미납', id: GA.NON.SIDE_BUTTON }, { title: '완납', id: GA.FULL.SIDE_BUTTON }, { title: '확인중' }];

export const getAdminDropdownStatusList = (situation: Situation) => {
  return STATUS_LIST.filter((status) => {
    if (status.title === '확인중') return false;
    if (situation === '확인중') return true;

    return status.title !== situation;
  });
};

export const getOwnDropdownStatusList = (situation: Situation) => {
  return STATUS_LIST.filter((status) => situation === '미납' && status.title === '확인중');
};
