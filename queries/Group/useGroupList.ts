import { getGroupList } from '@/api/Group';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

export const useGroupList = () => {
  return useInfiniteQuery(['groupList'], ({ pageParam = 0 }) => getGroupList(pageParam), {
    getNextPageParam: (context) => {
      return context.content.next ? context.nextPage : undefined;
    },
  });
};
