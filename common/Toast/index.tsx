import { notificationState } from '@/store/notificationState';
import React from 'react';
import { useRecoilState } from 'recoil';

const Toast = () => {
  const [notifications, setNotifications] = useRecoilState(notificationState);

  return <div></div>;
};

export default Toast;
