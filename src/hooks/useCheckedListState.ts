import { useRecoilState } from 'recoil';
import { EventInfoTest, SelectedEventInfo } from '@/types/event';
import { checkedListState } from '@/store/checkedListState';

const useCheckedListState = () => {
  const [checkedDetailFine, setCheckedDetailFine] = useRecoilState(checkedListState);

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

export default useCheckedListState;
