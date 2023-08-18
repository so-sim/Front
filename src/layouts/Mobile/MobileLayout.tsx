import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import useWindowHeight from '@/hooks/@common/useWindowHeight';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from './components/MobileHeader';
import MobileSideBar from './components/MobileSideBar';
import * as Style from './styles';

type Props = {
  location: 'HOME' | 'GROUP';
  children: React.ReactNode;
};

const MobileLayout = ({ location, children }: Props) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { windowRef } = useWindowHeight();

  const sideBarHandler = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <>
      <Style.Layout>
        <MobileHeader left={{ onClick: sideBarHandler, icon: SYSTEM.MENU }} title={<MobileLogo />} hasAuth />
        <Style.Body ref={windowRef}>{children}</Style.Body>
      </Style.Layout>
      {openSideBar && <MobileSideBar location={location} openSideBar={openSideBar} sideBarHandler={sideBarHandler} />}
    </>
  );
};

export default MobileLayout;

const MobileLogo = () => {
  const navigate = useNavigate();
  return <div onClick={() => navigate('/m-home')}>{LOGO.XS}</div>;
};
