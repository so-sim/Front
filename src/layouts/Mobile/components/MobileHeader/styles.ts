import styled from '@emotion/styled';

export const Header = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_300_b};
`;

export const Login = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.primary_400};
  border-radius: 4px;
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.primary_400};
  ${({ theme }) => theme.font.subhead_02}
`;
