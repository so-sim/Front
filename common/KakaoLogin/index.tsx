import { KAKAO_URL } from '@/constants/Auth';
import React, { FC } from 'react';
import { PropsWithChild } from '../Modal';

const KaKaoLogin: FC<PropsWithChild> = ({ children }) => {
  const toLogin = () => {
    window.location.href = KAKAO_URL.SIGIN;
  };

  return <button onClick={toLogin}>{children}</button>;
};

export default KaKaoLogin;
