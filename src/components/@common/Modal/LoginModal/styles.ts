import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const GuidePhrase = styled.p`
  padding-bottom: 20px;
  white-space: pre-wrap;
`;

export const Footer = styled.div`
  color: ${({ theme }) => theme.colors.secondary_500};
  ${({ theme }) => theme.font.caption};
`;

export const LoginBlock = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.colors.secondary_600};
  margin-left: 4px;
`;

export const LinkText = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
