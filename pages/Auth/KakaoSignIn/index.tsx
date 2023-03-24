import { useSignInQuery } from '@/queries/Auth/useSignInQuery';
import React, { useEffect } from 'react';
import Loading from '../Loading';

const KaKaoSignIn = () => {
  const href = window.location.href;
  const params = new URL(href).searchParams;
  const code = params.get('code');

  const { data } = useSignInQuery(code);

  return <Loading />;
};

export default KaKaoSignIn;
