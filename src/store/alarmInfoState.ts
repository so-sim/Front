import { SituationStatus } from '@/types/notification';
import { atom } from 'recoil';

export type AlarmInfoType = {
  alarmEventIdList: number[];
  beforeSituation: null | SituationStatus;
  afterSituation: null | SituationStatus;
  nickname: string;
  groupId: null | number;
};

export const initAlarmInfoState = {
  alarmEventIdList: [],
  beforeSituation: null,
  afterSituation: null,
  nickname: '',
  groupId: null,
};

export const alarmInfoState = atom<AlarmInfoType>({
  key: 'alarmEventIdListState',
  default: initAlarmInfoState,
});
