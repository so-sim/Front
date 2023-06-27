import { getGroupDetail } from '@/api/Group';
import { userState } from '@/store/userState';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

export const useGroupDetail = (groupId: number | undefined) => {
  const [user, setUser] = useRecoilState(userState);
  return useQuery(['groupDetail', groupId], () => getGroupDetail(groupId), {
    onSuccess(data) {
      setUser((prev) => ({ ...prev, isAdmin: data.content.isAdmin }));
    },
  });
};
