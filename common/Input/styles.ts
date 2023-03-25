import styled from '@emotion/styled';

export const Input = styled.input<{ isValid: boolean }>`
  ${({ theme }) => theme.font.body_02};
  border-radius: 4px;
  border: 1px solid ${({ theme, isValid }) => (isValid ? theme.colors.secondary_500 : theme.colors.red_100)};
  background-color: ${({ theme }) => theme.colors.secondary_100};
  width: 100%;
  padding: 8px 12px;
  &:focus {
    border: 1px solid ${({ theme, isValid }) => (isValid ? theme.colors.secondary_700 : theme.colors.red_100)};
  }
`;

export const Phrase = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 4px;
  & > * {
    ${({ theme }) => theme.font.caption}
  }
`;

export const ErrorText = styled.span<{ isValid: boolean }>`
  color: ${({ theme, isValid }) => (isValid ? theme.colors.secondary_500 : theme.colors.red_100)};
`;

export const Length = styled.span`
  color: ${({ theme }) => theme.colors.secondary_500};
`;
