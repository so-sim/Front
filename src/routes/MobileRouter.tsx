import MobileHome from '@/m-pages/MobileHome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const MobileRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/m-home" element={<MobileHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MobileRouter;
