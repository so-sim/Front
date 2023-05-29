import { userState } from '@/store/userState';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const usePushUserId = () => {
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.userId) {
      window.dataLayer.push({ user_id: user.userId });
    }
  }, [user.userId]);
};

export default usePushUserId;
