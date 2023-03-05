import styled from '@emotion/styled';

export const Card = styled.li`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary_100};
  overflow: hidden;
  cursor: pointer;
  max-width: 210px;
  height: 200px;
`;
