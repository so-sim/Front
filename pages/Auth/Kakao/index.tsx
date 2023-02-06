import React, { useEffect } from 'react';
import { kakaoLogin } from '../../../api/Auth';

const KaKaoAuth = () => {
  const href = window.location.href;
  const params = new URL(href).searchParams;
  const code = params.get('code');

  useEffect(() => {
    if (code) {
      kakaoLogin(code);
    }
  }, []);

  return <div>로그인중...?</div>;
};

export default KaKaoAuth;
