import React, { FC, ReactNode } from 'react';
import { PropsWithChild } from '../Modal';

const REDIRECT_URI = 'http://localhost:3090/login/oauth2/code/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KaKaoLogin: FC<PropsWithChild> = ({ children }) => {
  const toLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return <div onClick={toLogin}>{children}</div>;
};

export default KaKaoLogin;
