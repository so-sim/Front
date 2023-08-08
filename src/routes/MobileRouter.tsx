import MobileCalendar from '@/m-pages/MobileCalendar';
import MobileCreateGroup from '@/m-pages/MobileCreateGroup';
import MobileGroupHome from '@/m-pages/MobileGroupHome';
import MobileHome from '@/m-pages/MobileHome';
import MobileMemberManagement from '@/m-pages/MobileMemberManagement';
import MobilePreParing from '@/m-pages/MobilePreParing';
import PreParing from '@/pages/PreParing';
import MobileTOS from '@/m-pages/MobileTOS';
import MobileUserSetting from '@/m-pages/MobileUserSetting';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const MobileRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/m-home" element={<MobileHome />} />
        <Route path="/m-home/create-group" element={<MobileCreateGroup />} />
        <Route path="/m-group/:groupId/home" element={<MobileGroupHome />} />
        <Route path="/m-group/:groupId/preparing" element={<MobilePreParing />} />
        <Route path="/m-group/:groupId/member" element={<MobileMemberManagement />} />
        <Route path="/m-group/:groupId/calendar" element={<MobileCalendar />} />
        <Route path="/m-tos" element={<MobileTOS />} />
        <Route path="/m-setting" element={<MobileUserSetting />} />
        <Route path="/m-withdrawal" element={<MobileUserSetting />} />
      </Routes>
    </>
  );
};

export default MobileRouter;
