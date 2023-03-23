import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroupLayout from '../layouts/Group';
import KaKaoAuth from '../pages/Auth/Kakao';
import Home from '../pages/Home';
import TOS from '../pages/TOS';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login/kakao" element={<KaKaoAuth />} />
        <Route path="/tos" element={<TOS />} />
        <Route path="/group/:groupId/*" element={<GroupLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
