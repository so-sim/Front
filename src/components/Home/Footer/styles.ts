import styled from '@emotion/styled';

export const Footer = styled.footer`
  padding: 28px 0;
  max-width: 1200px;
  width: 100%;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const PRIVACY = styled.a`
  cursor: pointer;
  ${({ theme }) => theme.font.body_01}
  color: ${({ theme }) => theme.colors.secondary_600}
`;

export const TERMS = styled.a`
  cursor: pointer;
  ${({ theme }) => theme.font.body_01}
  color: ${({ theme }) => theme.colors.secondary_500}
`;

export const FooterLinkBlock = styled.div`
  display: flex;
  gap: 16px;
  ${({ theme }) => theme.font.body_01}
  color: ${({ theme }) => theme.colors.secondary_500};
  &:first-of-type {
    margin-bottom: 16px;
  }
`;
