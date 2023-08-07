import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import MobileLayout from '@/layouts/Mobile';
import MobileHeader from '@/layouts/Mobile/components/MobileHeader';
import MobileSideBar from '@/layouts/Mobile/components/MobileSideBar';

import { useState } from 'react';

const MobilePreParing = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const sideBarHandler = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <MobileLayout>
      <MobileHeader left={{ onClick: sideBarHandler, icon: SYSTEM.MENU }} title={LOGO.XS} hasAuth />

      {SYSTEM.PREPARING}
      {openSideBar && <MobileSideBar openSideBar={openSideBar} sideBarHandler={sideBarHandler} />}
    </MobileLayout>
  );
};

export default MobilePreParing;
