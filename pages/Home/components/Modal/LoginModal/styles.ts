import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const GuidePhrase = styled.p`
  margin-top: 22px;
`;

export const LinkTo = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.secondary_500};
  ${({ theme }) => theme.font.caption};

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    text-decoration: underline;
  }
`;

export const LoginBlock = styled.div`
  gap: 24px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.colors.secondary_600};
  margin-left: 4px;
`;
