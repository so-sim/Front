import { TOAST } from '@/assets/icons/Toast';
import React, { FC } from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Style from './styles';

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'action';
  message?: string;
  action?: string;
}

const toastOptions: ToastOptions = {
  position: 'bottom-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  closeButton: false,
};

export const ToastPopUp = ({ type, message, action }: ToastProps) => {
  switch (type) {
    case 'success':
      toast.success(message || '성공적으로 완료되었습니다', {
        ...toastOptions,
        icon: TOAST.SUCCESS,
      });
      return;
    case 'error':
      toast.error(message || '다시 한번 시도해주세요', {
        ...toastOptions,
        icon: TOAST.ERROR,
      });
  }
};

const Toast = () => {
  return <Style.Container />;
};
export default Toast;
