import KaKaoSignUp from '@/pages/Auth/KakaoSignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroupLayout from '../layouts/Group';
import KaKaoSignIn from '../pages/Auth/KakaoSignIn';
import Home from '../pages/Home';
import TOS from '../pages/TOS';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin/kakao" element={<KaKaoSignIn />} />
        <Route path="/auth/signup/kakao" element={<KaKaoSignUp />} />
        <Route path="/tos" element={<TOS />} />
        <Route path="/group/:groupId/*" element={<GroupLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
