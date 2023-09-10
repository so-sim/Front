import { getGroupDetail } from '@/api/Group';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

const EXCEPT_PATH = ['/group-setting/group', '/group-setting/alarm', '/create-finebook', '/update-finebook'];

export const useGroupDetail = (groupId: number | undefined) => {
  const navigate = useNavigate();
  const location = useLocation();
  return useQuery(['groupDetail', groupId], () => getGroupDetail(groupId), {
    onSuccess(data) {
      if (!data.content.isInto && !location.pathname.includes('/invitation')) {
        navigate('/not-auth');
      }
      if (!data.content.isAdmin) {
        EXCEPT_PATH.forEach((path) => {
          if (location.pathname.includes(path)) {
            navigate('/not-auth');
          }
        });
      }
    },
    // 죄송합니다,, 코드를 진짜 왜 이렇게 만들었지..
    // 진짜 생각없이 만들었네요,,,,,
    enabled: !!groupId,
  });
};
