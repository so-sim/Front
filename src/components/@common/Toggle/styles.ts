import styled from '@emotion/styled';

export const Background = styled.button<{ toggleState: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 20px;
  width: 38px;
  height: 20px;
  background: ${({ theme, toggleState }) => (toggleState ? theme.colors.primary_500 : theme.colors.secondary_400)};
`;

export const ToggleButton = styled.div<{ toggleState: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.secondary_100};
  transform: ${({ theme, toggleState }) => (toggleState ? 'translateX(22px)' : 'translateX(2px)')};
  transition: ease-in-out 0.15s;
`;
