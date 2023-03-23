import { useSignInQuery } from '@/queries/Auth/useSignInQuery';
import React, { useEffect } from 'react';

const KaKaoSignIn = () => {
  const href = window.location.href;
  const params = new URL(href).searchParams;
  const code = params.get('code');

  const { data } = useSignInQuery(code);

  return <div>로그인중...?</div>;
};

export default KaKaoSignIn;
