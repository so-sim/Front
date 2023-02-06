import React, { useEffect } from 'react';
import useSignInMutation from '../../../queries/Auth/useSignInMutation';

const KaKaoAuth = () => {
  const href = window.location.href;
  const params = new URL(href).searchParams;
  const code = params.get('code');

  const { mutate: signInMutate } = useSignInMutation();

  useEffect(() => {
    if (code) {
      signInMutate(code);
    }
  }, []);

  return <div>로그인중...?</div>;
};

export default KaKaoAuth;
