import { getGroupList } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';

export const useGroupList = () => {
  return useQuery(['groupList'], getGroupList);
};
