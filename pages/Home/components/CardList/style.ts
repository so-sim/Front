import styled from '@emotion/styled';

export const Card = styled.li`
  width: 176px;
  height: 200px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary_100};
`;

export const CardList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  max-width: 1200px;
  width: 100%;
`;

export const AddCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
