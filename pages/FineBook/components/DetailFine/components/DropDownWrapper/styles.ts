import styled from '@emotion/styled';

export const DropDownWrapper = styled.div<{ isValid: boolean }>`
  height: 44px;
  &:hover {
    background: ${({ theme, isValid }) => (isValid ? theme.colors.neutral_300_b : 'none')};
  }
`;
