import { LOGO } from '@/assets/icons/Logo';
import { SYSTEM } from '@/assets/icons/System';
import useWindowHeight from '@/hooks/@common/useWindowHeight';
import useLockScroll from '@/hooks/useLockScroll';
import React, { useState } from 'react';
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

  useLockScroll(openSideBar, 'openSideBar');

  const sideBarHandler = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <>
      <Style.Layout>
        <MobileHeader left={{ onClick: sideBarHandler, icon: SYSTEM.MENU }} title={<MobileLogo />} hasAuth />
        <Style.Body ref={windowRef} isHome={location === 'HOME'}>
          {children}
        </Style.Body>
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
