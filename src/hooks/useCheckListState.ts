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

  const checkDetailFineList = Object.values(checkDetailFine);

  const checkedSize = Object.keys(checkDetailFine).length;

  const checkedEventIdList = Object.keys(checkDetailFine);

  const setInitCheckDetailFine = () => {
    setCheckDetailFine({});
  };

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

  const isChecked = (eventId: number) => Object.keys(checkDetailFine).includes(String(eventId));

  const setToggleCheckList = (detail: SelectedEventInfo) => {
    if (!isChecked(detail.eventId)) {
      setAddCheckDetailFine(detail);
      return;
    }
    setSubtractCheckDetailFine(detail);
  };

  const isAllChecked = (eventIdList?: number[]) => eventIdList?.every((eventId) => isChecked(eventId)) || false;

  const setMultipleTogglCheckList = (details?: SelectedEventInfo[], eventIdList?: number[]) => {
    if (!isAllChecked(eventIdList)) {
      details?.forEach((item) => {
        setAddCheckDetailFine(item);
      });
      return;
    }
    details?.forEach((item) => {
      setSubtractCheckDetailFine(item);
    });
  };

  return {
    checkDetailFineList,
    checkedSize,
    checkedEventIdList,
    setCheckDetailFine: { setInitCheckDetailFine, setToggleCheckList, setMultipleTogglCheckList },
    isChecked,
    isAllChecked,
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
