import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const UserConfigButton = styled.button`
  display: flex;
  align-items: center;
`;

export const UserConfig = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;

  gap: ${isMobile ? '1rem' : '2rem'};
`;
