import { userState } from '@/store/userState';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const PermitTosRoute = () => {
  const user = useRecoilValue(userState);

  if (!user.isPermit && user.email) {
    return <Navigate to="/tos" />;
  }
  return <Outlet />;
};

export default PermitTosRoute;
