import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const Li = styled.li`
  list-style: disc;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.secondary_900};
  margin-bottom: 12px;
`;

export const Desc = styled.div`
  margin-left: 20px;
  ${({ theme }) => (isMobile ? theme.font.caption : theme.font.body_02)}
`;

export const UlContainer = styled.ul`
  margin-bottom: 20px;
  padding-left: 20px;
  ${({ theme }) => (isMobile ? theme.font.body_01 : theme.font.body_03)}
`;

export const Label = styled.label`
  ${({ theme }) => (isMobile ? theme.font.caption : theme.font.subhead_02)};
  margin-bottom: 40px;
  input {
    margin-right: 8px;
    ${({ theme }) => theme.font.subhead_03};
  }
  span {
    color: ${({ theme }) => theme.colors.red_400};
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
