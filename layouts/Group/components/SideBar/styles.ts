import styled from '@emotion/styled';

export const Layout = styled.div`
  border-right: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const Header = styled.header`
  padding: 12px 24px;
  width: 100%;
  height: 48px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  margin-bottom: 12px;
`;

export const TapContainer = styled.div`
  padding-left: 24px;
  margin-bottom: 24px;
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.secondary_700};
  }
`;

interface TapProps {
  disabled?: boolean;
}

export const Tap = styled.button<TapProps>`
  cursor: pointer;
  height: 36px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  text-align: center;
  gap: 4px;
  color: ${(props) => (props.disabled ? props.theme.colors.secondary_400 : 'black')};
`;
