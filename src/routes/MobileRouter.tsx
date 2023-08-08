import MobileCalendar from '@/m-pages/MobileCalendar';
import MobileCreateGroup from '@/m-pages/MobileCreateGroup';
import MobileGroupHome from '@/m-pages/MobileGroupHome';
import MobileHome from '@/m-pages/MobileHome';
import MobileMemberManagement from '@/m-pages/MobileMemberManagement';
import MobilePreParing from '@/m-pages/MobilePreParing';
import PreParing from '@/pages/PreParing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const MobileRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/m-home" element={<MobileHome />} />
        <Route path="/m-home/create-group" element={<MobileCreateGroup />} />
        <Route path="/m-group/:groupId/home" element={<MobileGroupHome />} />
        <Route path="/m-group/:groupId/preparing" element={<MobilePreParing />} />
        <Route path="/m-group/:groupId/member" element={<MobileMemberManagement />} />
        <Route path="/m-group/:groupId/calendar" element={<MobileCalendar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MobileRouter;
