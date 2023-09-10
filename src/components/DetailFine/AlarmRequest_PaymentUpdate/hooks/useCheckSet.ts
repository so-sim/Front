import { useRecoilState } from 'recoil';
import { EventInfoTest, SelectedEventInfo } from '@/types/event';
import { checkedListState } from '@/store/checkedListState';
import { useState } from 'react';

/**
 * 해당 CheckList를 eventId배열로만 관리할 수 있을 경우 사용하면 좋을 것 같아 남겨두었습니다.
 */

const useCheckSet = (initArray: number[]) => {
  const [checkedDetailFine, setCheckedDetailFine] = useState(new Set([...initArray]));

  const setInitCheckedList = () => {
    setCheckedDetailFine(new Set());
  };

  const isChecked = (eventId: number) => checkedDetailFine.has(eventId);

  const setAddCheckedList = (eventId: number) => {
    setCheckedDetailFine((prev) => new Set(prev.add(eventId)));
  };

  const setSubtractCheckedList = (eventId: number) => {
    setCheckedDetailFine((prev) => new Set([...prev].filter((id) => id !== eventId)));
    // setCheckedDetailFine((prev) => {
    //   prev.delete(eventId);
    //   return new Set(prev);
    // });
    // 이게 더 빠를 것 같은데,,
  };

  const setToggleCheckedList = (eventId: number) => {
    if (!isChecked(eventId)) {
      setAddCheckedList(eventId);
      return;
    }
    setSubtractCheckedList(eventId);
  };

  const isAllChecked = (eventIdList: number[]) => eventIdList.every((eventId) => isChecked(eventId));

  const setMultipleAddCheckedList = (eventIdList: number[]) => {
    setCheckedDetailFine((prev) => new Set([...prev, ...eventIdList]));
  };

  const setMultipleSubtractCheckedList = (eventIdList: number[]) => {
    setCheckedDetailFine((prev) => new Set([...prev].filter((id) => !eventIdList.includes(id))));
  };

  const setMultipleTogleCheckedList = (eventIdList: number[]) => {
    if (!isAllChecked(eventIdList)) {
      setMultipleAddCheckedList(eventIdList);
      return;
    }
    setMultipleSubtractCheckedList(eventIdList);
  };

  return {
    checkedDetailFine,

    setCheckedDetailFine: { setToggleCheckedList, setMultipleTogleCheckedList, setInitCheckedList },
    isChecked,
    isAllChecked,
  };
};

export default useCheckSet;
