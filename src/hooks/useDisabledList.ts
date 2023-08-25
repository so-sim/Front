import { useGetDetailListById } from '@/queries/Detail/useGetDetailListById';
import { SelectedEventInfo, Situation } from '@/types/event';
import React from 'react';

//disabled 되어야하는 List를 가져오는 hook
const useDisabledList = (groupId: number, checkEventIdList: number[], currentSituation: Situation) => {
  const { data, isLoading } = useGetDetailListById(groupId, checkEventIdList);

  // Id로 가져오기랑 기존 가져오기를 합치면 무한 스크롤형식의 size가 들어가서 불편할듯

  const getDisabledEventIdList = React.useCallback(
    (data?: SelectedEventInfo[], currentSituation?: Situation) => data?.filter((item) => item.situation !== currentSituation).map((item) => item.eventId),
    [],
  );

  const disabledEventIdList = React.useMemo(() => getDisabledEventIdList(data?.content.eventList, currentSituation), [data]);

  const isDisabledItem = (eventId: number) => disabledEventIdList?.includes(eventId);

  return {
    data,
    isLoading,
    disabledEventIdList,
    isDisabledItem,
  };
};

export default useDisabledList;
