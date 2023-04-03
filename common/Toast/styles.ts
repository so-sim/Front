import { ToastContainer } from 'react-toastify';
import styled from '@emotion/styled';

export const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px 16px;
    gap: 8px;
    width: 346px;
    background: #ffffff;
    border-radius: 12px;
  }
  .Toastify__toast-icon {
    width: 24px;
    height: 24px;
  }

  .Toastify__toast--success {
    border: 2px solid #1c6ee9;
    color: #1c6ee9;
  }

  .Toastify__toast--error {
    border: 2px solid #dd2424;
    color: #dd2424;
  }
`;
