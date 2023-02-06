import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KaKaoAuth from '../pages/Auth/Kakao';
import Home from '../pages/Home';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/kakao/callback" element={<KaKaoAuth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
