import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const GuidePhrase = styled.p`
  /* margin-top: 22px; */
`;

export const Footer = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary_500};
  ${({ theme }) => theme.font.caption};

  &:hover {
    text-decoration: underline;
  }
`;

export const LoginBlock = styled.div`
  margin-top: 20px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.colors.secondary_600};
  margin-left: 4px;
`;
