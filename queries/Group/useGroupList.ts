import { getGroupList } from '@/api/Group';
import { ToastPopUp } from '@/common/Toast';
import { TOAST_ERROR } from '@/constants/Toast';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

export const useGroupList = () => {
  return useInfiniteQuery(['groupList'], ({ pageParam = 0 }) => getGroupList(pageParam), {
    getNextPageParam: (context) => {
      return context.content.next ? context.nextPage : undefined;
    },
    onError: () => {
      ToastPopUp({ type: 'error', message: TOAST_ERROR.DATA });
    },
  });
};
