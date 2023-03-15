import { getGroupList } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useGroupList = (index: number) => {
  return useQuery(['groupList'], () => getGroupList(index));
};
