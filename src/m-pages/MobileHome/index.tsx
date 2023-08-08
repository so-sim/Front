import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import MobileLayout from '@/layouts/Mobile';
import MobileHeader from '@/layouts/Mobile/components/MobileHeader';
import MobileSideBar from '@/layouts/Mobile/components/MobileSideBar';
import MobileGroupSection from '@/m-components/MobileHome/GroupSection';
import { useState } from 'react';

const MobileHome = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const sideBarHandler = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <>
      <MobileLayout>
        <MobileHeader left={{ onClick: sideBarHandler, icon: SYSTEM.MENU }} title={LOGO.XS} hasAuth />
        <div style={{ height: '200px', width: '100%', backgroundColor: '#000000' }} />
        <MobileGroupSection />
      </MobileLayout>
      {openSideBar && <MobileSideBar openSideBar={openSideBar} sideBarHandler={sideBarHandler} location="HOME" />}
    </>
  );
};

export default MobileHome;
