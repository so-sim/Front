import styled from '@emotion/styled';

export const Header = styled.header<{ hasAuth?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 2px solid ${({ theme, hasAuth }) => (hasAuth ? theme.colors.neutral_300_b : theme.colors.secondary_100)};
`;

export const Login = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.primary_400};
  border-radius: 4px;
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.primary_400};
  ${({ theme }) => theme.font.subhead_02}
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_03}
`;
