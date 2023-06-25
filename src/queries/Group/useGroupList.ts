import { getGroupList } from '@/api/Group';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/acceessToken';

export const useGroupList = () => {
  return useInfiniteQuery(['groupList'], ({ pageParam = 0 }) => getGroupList(pageParam), {
    getNextPageParam: (context) => {
      return context?.content?.hasNext ? context.nextPage : undefined;
    },
    enabled: !!getAccessToken(),
  });
};
