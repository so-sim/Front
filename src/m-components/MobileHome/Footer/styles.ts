import styled from '@emotion/styled';

export const Footer = styled.footer`
  margin-top: 32px;
  padding: 12px 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const PRIVACY = styled.a`
  cursor: pointer;
  ${({ theme }) => theme.font.caption}
  color: ${({ theme }) => theme.colors.secondary_600}
`;

export const TERMS = styled.a`
  cursor: pointer;
  ${({ theme }) => theme.font.caption}
  color: ${({ theme }) => theme.colors.secondary_500}
`;

export const FooterLinkBlock = styled.div`
  display: flex;
  gap: 22px;
  ${({ theme }) => theme.font.caption}
  color: ${({ theme }) => theme.colors.secondary_500};
  &:first-of-type {
    margin-bottom: 8px;
  }
`;
