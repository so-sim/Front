import styled from '@emotion/styled';

export const Background = styled.button<{ onToggle: boolean }>`
  border-radius: 20px;
  width: 38px;
  height: 18px;
  background: ${({ theme, onToggle }) => (onToggle ? theme.colors.primary_500 : theme.colors.secondary_400)};
`;

export const ToggleButton = styled.div<{ onToggle: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.secondary_100};
  transform: ${({ theme, onToggle }) => (onToggle ? 'translateX(22px)' : 'translateX(2px)')};
  transition: ease-in-out 0.15s;
`;
