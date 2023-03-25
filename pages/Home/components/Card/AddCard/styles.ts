import styled from '@emotion/styled';

export const AddCardFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const AddCardText = styled.div`
  margin-top: 16px;
  ${({ theme }) => theme.font.subhead_03}
`;
