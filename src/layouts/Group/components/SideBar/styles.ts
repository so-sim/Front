import styled from '@emotion/styled';

export const Layout = styled.div`
  border-right: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const Category = styled.span`
  ${({ theme }) => theme.font.subhead_01}
`;

export const Header = styled.header`
  padding: 12px 24px;
  width: 100%;
  height: 48px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  margin-bottom: 12px;
  ${({ theme }) => theme.font.subhead_03}
  @media (max-width: 1718px) {
    font-size: 16px;
  }
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
  /* width: 100%; */
  /* width 100프로하니 disabled:true인 애들이 route 이동이 안되는 issue 발생 (Tap이 button이여서 기본프로퍼티 disabled 적용때문이였음) */
  /* 추후 li태그로 변경필요 */
  height: 36px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  text-align: center;
  gap: 4px;
  span {
    color: ${(props) => (props.disabled ? props.theme.colors.secondary_400 : props.theme.colors.secondary_800)};
    ${({ theme }) => theme.font.subhead_02}
  }
`;

interface SelectedProps {
  isSelected: boolean;
}

export const Selected = styled.div<SelectedProps>`
  display: ${(props) => (props.isSelected ? 'block' : 'none')};
  position: absolute;
  width: 6px;
  left: -24px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.secondary_900};
  border-radius: 0px 4px 4px 0px;
`;

export const GroupSettingContainer = styled.div`
  cursor: pointer;
`;
