import styled from '@emotion/styled';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  ${({ theme }) => theme.font.subhead_02}
`;
