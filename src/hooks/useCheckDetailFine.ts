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
};

const useCheckDetailFine = () => {
  const [checkDetailFine, setCheckDetailFine] = useState<CheckDetailFine>({});

  const setSubtractCheckDetailFine = (detail: SelectedEventInfo) => {
    setCheckDetailFine((prev) => {
      const { [String(detail.eventId)]: removeId, ...rest } = prev;

      return rest;
      // 테스팅하기 위해서, prev와 detail를 인자로 받는 함수를 생성
      // state 테스팅
    });
  };

  const setAddCheckDetailFine = (detail: SelectedEventInfo) => {
    setCheckDetailFine((prev) => ({
      ...prev,
      [detail.eventId]: { ...detail, checked: true },
    }));
  };

  const setToggleCheckDetailFineByNickName = (nickName: string) => {
    const targetEventId = Object.keys(checkDetailFine).filter((eventId) => checkDetailFine[eventId].nickname === nickName);

    targetEventId.forEach((eventId) =>
      setCheckDetailFine((prev) => ({
        ...prev,
        [eventId]: { ...checkDetailFine[eventId], checked: !checkDetailFine[eventId].checked },
      })),
    );
  };

  const setInitCheckDetailFine = () => {
    setCheckDetailFine({});
  };

  return { checkDetailFine, setCheckDetailFine: { setSubtractCheckDetailFine, setAddCheckDetailFine, setToggleCheckDetailFineByNickName, setInitCheckDetailFine } };
};

export default useCheckDetailFine;
