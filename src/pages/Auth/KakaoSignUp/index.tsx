import React, { useEffect } from 'react';
import useSignUpMutation from '../../../queries/Auth/useSignUpMutation';
import Loading from '@/components/Auth/Loading';

const KaKaoSignUp = () => {
  const href = window.location.href;
  const params = new URL(href).searchParams;
  const code = params.get('code');

  const { mutate: signUpMutate } = useSignUpMutation();

  useEffect(() => {
    if (code) {
      signUpMutate(code);
    }
  }, []);

  return <Loading />;
};

export default KaKaoSignUp;
