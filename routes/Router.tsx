import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroupLayout from '../layouts/Group';
import KaKaoAuth from '../pages/Auth/Kakao';
import Home from '../pages/Home';
import TOS from '../pages/TOS';
import PermitTosRoute from './PermitTosRoute';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tos" element={<TOS />} />
        <Route path="/auth/login/kakao" element={<KaKaoAuth />} />
        <Route element={<PermitTosRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/group/:groupId/*" element={<GroupLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
