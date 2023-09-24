import React, { PropsWithChildren, useCallback } from 'react';
import { useReTakeToken } from './queries/Auth/useReTakeToken';

const Auth = ({ children }: PropsWithChildren) => {
  useReTakeToken();

  return <>{children}</>;
};

export default Auth;
