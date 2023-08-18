import useRedirectURL from '@/hooks/@common/useRedirectURL';
import usePushUserId from '@/hooks/usePushUserId';
import KaKaoSignUp from '@/pages/Auth/KakaoSignUp';
import Invitation from '@/pages/Invitation';
import ServiceWithdrawal from '@/pages/Withdrawal';
import { Routes, Route } from 'react-router-dom';
import GroupLayout from '../layouts/Group';
import KaKaoSignIn from '../pages/Auth/KakaoSignIn';
import Home from '../pages/Home';
import TOS from '../pages/TOS';

const Router = () => {
  usePushUserId();
  useRedirectURL();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin/kakao" element={<KaKaoSignIn />} />
        <Route path="/auth/signup/kakao" element={<KaKaoSignUp />} />
        <Route path="/tos" element={<TOS />} />
        <Route path="/withdrawal" element={<ServiceWithdrawal />} />
        <Route path="/group/:groupId/*" element={<GroupLayout />} />
        <Route path="/invitation" element={<Invitation />} />
      </Routes>
    </>
  );
};

export default Router;
