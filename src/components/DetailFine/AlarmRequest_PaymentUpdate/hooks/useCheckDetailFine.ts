import { useState } from 'react';
import { EventInfoTest, SelectedEventInfo } from '@/types/event';

export type SelectedEventInfo_Checked = SelectedEventInfo & { checked: boolean };

export type CheckDetailFine = {
  [key: string]: SelectedEventInfo_Checked;
};

export type SetCheckDetailFine = {
  setAddCheckDetailFine: (detail: SelectedEventInfo) => void;
  setSubtractCheckDetailFine: (detail: SelectedEventInfo) => void;
  setToggleCheckDetailFineByNickName: (nickName: string) => void;
  setInitCheckDetailFine: () => void;
  setToggleCheckDetailFine: (eventId: string) => void;
};

const useCheckDetailFine = () => {
  const [checkDetailFine, setCheckDetailFine] = useState<CheckDetailFine>({});

  const setSubtractCheckDetailFine = (detail: SelectedEventInfo) => {
    setCheckDetailFine(
      (prev) => subtractCheckDetailFine(detail, prev),
      // 테스팅하기 위해서, prev와 detail를 인자로 받는 함수를 생성
      // state 테스팅
    );
  };

  const setAddCheckDetailFine = (detail: SelectedEventInfo) => {
    setCheckDetailFine((prev) => addCheckDetailFine(detail, prev));
  };

  const setToggleCheckDetailFineByNickName = (nickName: string) => {
    setCheckDetailFine((prev) => toggleCheckDetailFine(nickName, prev));
  };

  const setInitCheckDetailFine = () => {
    setCheckDetailFine({});
  };

  const setToggleCheckDetailFine = (eventId: string) => {
    setCheckDetailFine((prev) => {
      return {
        ...prev,
        [eventId]: {
          ...prev[eventId],
          checked: !prev[eventId].checked,
        },
      };
    });
  };

  return {
    checkDetailFine,
    setCheckDetailFine: { setSubtractCheckDetailFine, setAddCheckDetailFine, setToggleCheckDetailFineByNickName, setInitCheckDetailFine, setToggleCheckDetailFine },
  };
};

export default useCheckDetailFine;

export function subtractCheckDetailFine(detail: SelectedEventInfo, prev: CheckDetailFine) {
  const { [String(detail.eventId)]: removeId, ...rest } = prev;

  return rest;
}

export function addCheckDetailFine(detail: SelectedEventInfo, prev: CheckDetailFine) {
  return {
    ...prev,
    [detail.eventId]: { ...detail, checked: true },
  };
}

export function toggleCheckDetailFine(nickName: string, prev: CheckDetailFine) {
  const targetEventId = Object.keys(prev).filter((eventId) => prev[eventId].nickname === nickName);

  const targetDetailFine: CheckDetailFine = {};

  targetEventId.forEach((eventId) => (targetDetailFine[eventId] = { ...prev[eventId], checked: !prev[eventId].checked }));

  return {
    ...prev,
    ...targetDetailFine,
  };
}
