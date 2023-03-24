import styled from '@emotion/styled';

export const Title = styled.div`
  /* margin-bottom: 24px; */
`;

export const Input = styled.input<{ isValid: boolean }>`
  border-radius: 4px;
  border: 1px solid ${({ theme, isValid }) => (isValid ? theme.colors.secondary_500 : theme.colors.red_100)};
  background-color: ${({ theme }) => theme.colors.secondary_100};
  width: 100%;
  padding: 8px 12px;
  &:focus {
    border: 1px solid ${({ theme, isValid }) => (isValid ? theme.colors.secondary_700 : theme.colors.red_100)};
  }
`;
