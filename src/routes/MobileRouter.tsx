import MobileCalendar from '@/m-pages/MobileCalendar';
import MobileCreateGroup from '@/m-pages/MobileCreateGroup';
import MobileSetting from '@/m-pages/MobileSetting';
import MobileHome from '@/m-pages/MobileHome';
import MobileMemberManagement from '@/m-pages/MobileMemberManagement';
import MobilePreParing from '@/m-pages/MobilePreParing';
import MobileTOS from '@/m-pages/MobileTOS';
import MobileUserSetting from '@/m-pages/MobileUserSetting';
import MobileWithdrawal from '@/m-pages/MobileWithdrawal';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MobileGroupSetting from '@/m-pages/MobileSetting/MobileGroupSetting';
import MobileAlarmSetting from '@/m-pages/MobileSetting/MobileAlarmSetting';
import MobileDetailFine from '@/m-components/MobileDetailFine';
import MobileMemberSearch from '@/m-pages/MobileMemberSearch';
import MobileCreateFineBook from '@/m-pages/MobileCreateFineBook';
import MobileUpdateFineBook from '@/m-pages/MobileUpdateFineBook';
import MobileUserGroupSetting from '@/m-pages/MobileSetting/MobileUserGroupSetting';
import MobileFineBookDetail from '@/m-pages/MobileFineBookDetail';
import MobileAlarmRequest_Payment from '@/m-pages/MobileAlarmRequest_Payment';
import Page404 from '@/components/error/404';
import usePushUserId from '@/hooks/usePushUserId';
import useRedirectURL from '@/hooks/@common/useRedirectURL';
import NotAuth from '@/components/error/notAuth';

const MobileRouter = () => {
  usePushUserId();
  useRedirectURL();
  // 뭔가 BrowserRouter 안에 provider느낌으로 한번만 사용해도 되지않을까 싶은데.. 방법을 모르겠네요

  return (
    <>
      <Routes>
        <Route path="/m-home" element={<MobileHome />} />
        <Route path="/m-home/create-group" element={<MobileCreateGroup />} />
        <Route path="/m-group/:groupId/home" element={<MobilePreParing />} />
        <Route path="/m-group/:groupId/notice" element={<MobilePreParing />} />
        <Route path="/m-group/:groupId/member" element={<MobileMemberManagement />} />
        <Route path="/m-group/:groupId/book" element={<MobileCalendar />} />
        <Route path="/m-group/:groupId/book/member-search" element={<MobileMemberSearch />} />
        {/* <Route path="/m-group/:groupId/book/detail" element={<MobileDetailFine />} /> */}
        <Route path="/m-group/:groupId/book/detail/:fineBookDetailId" element={<MobileFineBookDetail />} />
        <Route path="/m-group/:groupId/group-setting" element={<MobileSetting />} />
        <Route path="/m-group/:groupId/group-setting/user-group" element={<MobileUserGroupSetting />} />
        <Route path="/m-group/:groupId/group-setting/group" element={<MobileGroupSetting />} />
        <Route path="/m-group/:groupId/group-setting/alarm" element={<MobileAlarmSetting />} />
        <Route path="/m-group/:groupId/create-finebook" element={<MobileCreateFineBook />} />
        <Route path="/m-group/:groupId/update-finebook" element={<MobileUpdateFineBook />} />
        <Route path="/m-group/:groupId/book/alarm" element={<MobileAlarmRequest_Payment />} />
        <Route path="/m-tos" element={<MobileTOS />} />
        <Route path="/m-setting" element={<MobileUserSetting />} />
        <Route path="/m-withdrawal" element={<MobileWithdrawal />} />
        <Route path="/not-found" element={<Page404 />} />
        <Route path="/not-auth" element={<NotAuth />} />
        <Route path="/m-group/*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default MobileRouter;
