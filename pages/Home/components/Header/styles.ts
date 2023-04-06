import styled from '@emotion/styled';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary_100};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const HeaderLogo = styled.span`
  height: 32px;
  cursor: pointer;
`;

export const HeaderLeft = styled.span`
  display: flex;
  align-items: center;
  margin-left: 12px;
`;

export const HeaderRight = styled.span`
  display: flex;
  margin-right: 12px;
`;

export const Logo = styled.span`
  display: flex;
  align-items: center;
  height: 32px;
  margin-right: 40px;
`;

export const NavSection = styled.div`
  margin-left: 40px;
  display: flex;
  align-items: center;
  gap: 28px;
  & > button {
    ${({ theme }) => theme.font.subhead_02};
  }
`;

export const GNBLink = styled.a`
  ${({ theme }) => theme.font.subhead_02};

  cursor: pointer;
`;

export const Login = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.primary_400};
  border-radius: 4px;
  padding: 8px 28px;
  color: ${({ theme }) => theme.colors.primary_400};
  ${({ theme }) => theme.font.subhead_02}
`;
