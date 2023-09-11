import styled from '@emotion/styled';
import { HEADER_HEIGHT } from '@/constants/Menu';

export const AlarmDetailFrame = styled.div<{ $headerHeight: number }>`
  position: absolute;
  top: ${({ $headerHeight }) => `${$headerHeight}rem`};
  right: 0;
  bottom: 0;
  /* height: calc(100vh - 72px); */
  z-index: 19;

  width: 460px;

  border-left: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
  /* margin-top: 1px; */

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
  text-align: left;

  padding: 1.5rem 1.5rem 0 1.5rem;
`;

export const CloseText = styled.span`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const BackDrop = styled.div<{ $headerHeight: number }>`
  position: absolute;
  top: ${({ $headerHeight }) => `${$headerHeight}rem`};
  bottom: 0;
  right: 0;
  left: 0;

  background-color: white;
  opacity: 30%;

  z-index: 18;
`;
