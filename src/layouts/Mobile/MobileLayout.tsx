import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import React, { useState } from 'react';
import MobileHeader from './components/MobileHeader';
import MobileSideBar from './components/MobileSideBar';
import * as Style from './styles';

type Props = {
  location: 'HOME' | 'GROUP';
  children: React.ReactNode;
};

const MobileLayout = ({ location, children }: Props) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const sideBarHandler = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <>
      <Style.Layout>
        <MobileHeader left={{ onClick: sideBarHandler, icon: SYSTEM.MENU }} title={LOGO.XS} hasAuth />
        {children}
      </Style.Layout>
      {openSideBar && <MobileSideBar location={location} openSideBar={openSideBar} sideBarHandler={sideBarHandler} />}
    </>
  );
};

export default MobileLayout;
