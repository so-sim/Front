import { userState } from '@/store/userState';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const PermitTosRoute = () => {
  const user = useRecoilValue(userState);
  const { pathname } = useLocation();

  const checkPathName = /group/g;

  if (!user.isPermit && user.email) {
    return <Navigate to="/tos" />;
  }

  if (checkPathName.test(pathname) && !user.email) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PermitTosRoute;
