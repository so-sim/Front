import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants/Menu';

export const AlarmDetailFrame = styled.div`
  position: absolute;
  top: ${HEADER_HEIGHT};
  right: 0;
  bottom: 0;

  z-index: 9999;

  width: 460px;

  border-left: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
  margin-top: 1px;

  background-color: white;
`;

export const Header = styled.div`
  padding: 0.75rem 1.5rem;

  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_300_b};
`;

export const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;

  height: 24px;
  margin-right: 4px;
  cursor: pointer;
`;

export const Main = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
`;
