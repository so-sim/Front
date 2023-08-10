import { useRecoilState } from 'recoil';
import { EventInfoTest, SelectedEventInfo } from '@/types/event';
import { checkedListState } from '@/store/checkedListState';

const useCheckedListState = () => {
  const [checkedDetailFine, setCheckedDetailFine] = useRecoilState(checkedListState);

  const setAddCheckedList = (eventId: number) => {
    setCheckedDetailFine((prev) => new Set(prev.add(eventId)));
  };

  const setSubtractCheckedList = (eventId: number) => {
    setCheckedDetailFine((prev) => new Set([...prev].filter((id) => id !== eventId)));
    // setCheckedDetailFine((prev) => {
    //   prev.delete(eventId);
    //   return new Set(prev);
    // });
    // 어떤게 더 빠를까
  };

  const setMultipleSubtractCheckedList = (eventIds: number[]) => {
    setCheckedDetailFine((prev) => new Set([...prev].filter((id) => !eventIds.includes(id))));
  };

  const setMultipleAddCheckedList = (eventIds: number[]) => {
    setCheckedDetailFine((prev) => new Set([...prev, ...eventIds]));
  };

  const setInitCheckedList = () => {
    setCheckedDetailFine(new Set());
  };

  const isChecked = (eventId: number) => checkedDetailFine.has(eventId);

  return {
    checkedDetailFine,
    setCheckedDetailFine: { setAddCheckedList, setSubtractCheckedList, setMultipleAddCheckedList, setMultipleSubtractCheckedList, setInitCheckedList },
    isChecked,
  };
};

export default useCheckedListState;
