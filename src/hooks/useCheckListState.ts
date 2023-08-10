import { checkListState, CheckListState } from '@/store/checkListState';
import { useRecoilState } from 'recoil';
import { EventInfoTest, SelectedEventInfo } from '@/types/event';

export type SetCheckListState = {
  setAddCheckDetailFine: (detail: SelectedEventInfo) => void;
  setSubtractCheckDetailFine: (detail: SelectedEventInfo) => void;
  setInitCheckDetailFine: () => void;
};

const useCheckListState = () => {
  const [checkDetailFine, setCheckDetailFine] = useRecoilState(checkListState);

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

  const setInitCheckDetailFine = () => {
    setCheckDetailFine({});
  };

  const isChecked = (eventId: number) => Object.keys(checkDetailFine).includes(String(eventId));

  return {
    checkDetailFine,
    setCheckDetailFine: { setInitCheckDetailFine, setSubtractCheckDetailFine, setAddCheckDetailFine },
    isChecked,
  };
};

export default useCheckListState;

export function subtractCheckDetailFine(detail: SelectedEventInfo, prev: CheckListState) {
  const { [String(detail.eventId)]: removeId, ...rest } = prev;

  return rest;
}

export function addCheckDetailFine(detail: SelectedEventInfo, prev: CheckListState) {
  return {
    ...prev,
    [detail.eventId]: { ...detail },
  };
}
