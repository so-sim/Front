import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

export const Layout = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border-right: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  padding: 24px 0;
  align-items: center;
  overflow-y: auto;
`;

export const EachGroup = styled.button`
  display: flex;
  width: 52px;
  height: 52px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  color: white;
  cursor: pointer;
  & > span {
    ${({ theme }) => theme.font.subhead_01}
  }
`;

interface CoverProps {
  isSelected: boolean;
}
export const Groups = styled(NavLink)`
  position: relative;
  margin-bottom: 12px;
`;

export const Cover = styled(EachGroup)<CoverProps>`
  position: absolute;
  background-color: ${(props) => (props.isSelected ? 'none' : props.theme.colors.primary_900)};
  opacity: ${(props) => (props.isSelected ? 'none' : '0.5')};
`;

export const CreateButton = styled(EachGroup)`
  background-color: ${({ theme }) => theme.colors.neutral_400_b};
  min-width: 52px;
  min-height: 52px;
`;
