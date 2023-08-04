import * as Style from './styles';
import { useState } from 'react';
import UserConfig from '@/components/Home/Header/UserConfig';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/userState';
import { AuthModal } from '@/components/@common/Modal/LoginModal';

type Props = {
  left?: { icon: JSX.Element; onClick: () => void };
  title: JSX.Element | string;
  hasAuth?: boolean;
};

const MobileHeader = ({ left, title, hasAuth }: Props) => {
  const [user] = useRecoilState(userState);
  const [openModal, setOpenModal] = useState(false);

  const loginModalHandler = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <>
      <Style.Header hasAuth={hasAuth}>
        {left ? <span onClick={left.onClick}>{left.icon}</span> : <div />}
        {<Style.Title>{title}</Style.Title>}
        {hasAuth ? (
          <>
            <Style.Login onClick={loginModalHandler}>로그인</Style.Login>
            {user.userId === null ? (
              <Style.Login onClick={loginModalHandler}>로그인</Style.Login> //
            ) : (
              <UserConfig />
            )}
          </>
        ) : (
          <div />
        )}
      </Style.Header>
      {openModal && <AuthModal modalHandler={loginModalHandler} />}
    </>
  );
};

export default MobileHeader;
