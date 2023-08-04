import MobileCreateGroup from '@/m-pages/MobileCreateGroup';
import MobileGroupHome from '@/m-pages/MobileGroupHome';
import MobileHome from '@/m-pages/MobileHome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const MobileRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/m-home" element={<MobileHome />} />
        <Route path="/m-home/create-group" element={<MobileCreateGroup />} />
        <Route path="/m-group/:groupId/home" element={<MobileGroupHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MobileRouter;
