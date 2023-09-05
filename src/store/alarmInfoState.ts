import { NotificationType, SituationStatus } from '@/types/notification';
import { isMobile } from 'react-device-detect';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  storage: localStorage,
});

export type AlarmInfoType = {
  alarmEventIdList: number[];
  beforeSituation: null | SituationStatus;
  afterSituation: null | SituationStatus;
  nickname: string;
  groupId: null | number;
  type: null | NotificationType;
};

export const initAlarmInfoState = {
  alarmEventIdList: [],
  beforeSituation: null,
  afterSituation: null,
  nickname: '',
  groupId: null,
  type: null,
};

export const alarmInfoState = atom<AlarmInfoType>({
  key: 'alarmEventIdListState',
  default: initAlarmInfoState,
  effects_UNSTABLE: isMobile ? [persistAtom] : [],
});
