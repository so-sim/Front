import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KaKaoAuth from '../pages/Auth/Kakao';
import Home from '../pages/Home';
import TOS from '../pages/TOS';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/kakao/callback" element={<KaKaoAuth />} />
        <Route path="/tos" element={<TOS />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
