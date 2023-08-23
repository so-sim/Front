import styled from '@emotion/styled';

export const Title = styled.div`
  padding: 12px 0 14px 0;
  ${({ theme }) => theme.font.subhead_04};
`;

export const GroupSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  background: ${({ theme }) => theme.colors.neutral_200_b};
  height: 100%;
`;

export const CardList = styled.ul`
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(156px, auto));
  grid-auto-columns: 156px;
  width: 100%;
`;
