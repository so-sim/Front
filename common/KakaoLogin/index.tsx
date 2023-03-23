import React, { FC, ReactNode } from 'react';
import { PropsWithChild } from '../Modal';

const REDIRECT_URI = 'http://localhost:3090/auth/login/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KaKaoLogin: FC<PropsWithChild> = ({ children }) => {
  const toLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return <button onClick={toLogin}>{children}</button>;
};

export default KaKaoLogin;
