import { atom } from 'recoil';

export interface AlarmInfoState {
  date: string;
  type: string;
  groupId: number | null;
  groupTitle: string;
  category: string;
  summary: string;
  messageData: string[];
  eventIdList: number[];
}

export const initialAlarmInfoState = {
  date: '',
  type: '',
  groupId: null,
  groupTitle: '',
  category: '',
  summary: '',
  messageData: [],
  eventIdList: [],
};

export const alarmInfoState = atom<AlarmInfoState>({
  key: 'alarmInfoState',
  default: initialAlarmInfoState,
});
