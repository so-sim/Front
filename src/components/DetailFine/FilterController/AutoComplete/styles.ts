import styled from '@emotion/styled';

export const SearchBar = styled.input`
  height: 24px;
  color: ${({ theme }) => theme.colors.secondary_800};
  ${({ theme }) => theme.font.body_02};
`;
