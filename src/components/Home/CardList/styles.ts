import styled from '@emotion/styled';

export const CardList = styled.ul`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(176px, auto));
  grid-auto-columns: 176px;
  width: 100%;
  margin: auto;
`;

export const AddCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
