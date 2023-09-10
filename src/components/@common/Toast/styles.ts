import { ToastContainer } from 'react-toastify';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import { css } from '@emotion/react';

export const Container = styled(ToastContainer)`
  .Toastify__toast {
    ${isMobile
      ? css`
          font-family: 'SUIT';
          font-size: 18px;
          font-family: SUIT;
          font-weight: 600;
        `
      : css`
          font-size: 16px;
          font-family: SUIT;
          font-weight: 600;
        `}
    line-height: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
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
    ${isMobile &&
    css`
      width: calc(100% - 48px);
      margin: auto;
    `}
  }

  .Toastify__toast--error {
    border: 2px solid #dd2424;
    color: #dd2424;
  }
`;
