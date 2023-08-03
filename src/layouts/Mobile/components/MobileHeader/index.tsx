import { LOGO } from '@/assets/icons/Logo';
import * as Style from './styles';
import { useState } from 'react';
import { SYSTEM } from '@/assets/icons/System';
import UserConfig from '@/components/Home/Header/UserConfig';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/userState';
import { AuthModal } from '@/components/@common/Modal/LoginModal';
import MobileSideBar from '../MobileSideBar';

const MobileHeader = () => {
  const [user] = useRecoilState(userState);
  const [openModal, setOpenModal] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const loginModalHandler = () => {
    setOpenModal((prev) => !prev);
  };

  const sideBarHandler = () => {
    setOpenSideBar((prev) => !prev);
  };

  return (
    <>
      <Style.Header>
        <span onClick={sideBarHandler}>{SYSTEM.MENU}</span>
        {LOGO.XS}
        <Style.Login onClick={loginModalHandler}>로그인</Style.Login>
        {user.userId === null ? (
          <Style.Login onClick={loginModalHandler}>로그인</Style.Login> //
        ) : (
          <UserConfig />
        )}
      </Style.Header>
      {openSideBar && <MobileSideBar openSideBar={openSideBar} sideBarHandler={sideBarHandler} />}
      {openModal && <AuthModal modalHandler={loginModalHandler} />}
    </>
  );
};

export default MobileHeader;
