import styled from '@emotion/styled';

export const SearchBar = styled.input`
  height: 24px;
  color: ${({ theme }) => theme.colors.secondary_800};
  ${({ theme }) => theme.font.body_02};
`;

export const AutoCompleteContainer = styled.div`
  position: relative;
`;

export const DropDownContainer = styled.div`
  position: absolute;
  left: 84px;
`;
