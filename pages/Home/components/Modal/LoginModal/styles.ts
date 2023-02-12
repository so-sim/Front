import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const GuidePhrase = styled.p`
  margin-top: 22px;
`;

export const LinkTo = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.secondary_500};

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
