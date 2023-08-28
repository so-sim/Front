import { getGroupList } from '@/api/Group';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAccessToken } from '@/utils/acceessToken';

export const useGroupList = () => {
  return useInfiniteQuery(['groupList'], ({ pageParam = 0 }) => getGroupList(pageParam), {
    enabled: !!getAccessToken(),
    getNextPageParam: (lastPage, allPage) => (lastPage.content.hasNext ? allPage.length : undefined),
  });
};
