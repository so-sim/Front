import { userState } from '@/store/userState';
import { pushDataLayer } from '@/utils/pushDataLayer';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const usePushUserId = () => {
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user.userId) pushDataLayer('login', { user_id: user.userId });
  }, [user.userId]);
};

export default usePushUserId;
