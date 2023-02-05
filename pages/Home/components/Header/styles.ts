import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  max-width: 1200px;
  width: 100%;
`;

export const HeaderLeft = styled.span`
  display: flex;
`;

export const HeaderRight = styled.span`
  display: flex;
`;

export const Logo = styled.span`
  display: flex;
  align-items: center;
  height: 40px;
  margin-right: 40px;
`;

export const NavSection = styled.span`
  display: flex;
  gap: 28px;
`;

export const Login = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.primary_400};
  border-radius: 4px;
  padding: 8px 28px;
`;
