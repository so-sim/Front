import styled from '@emotion/styled';

export const DetailFineFrame = styled.section`
  /* position: relative; */
  /* relative 주게되면 다 깨진다... 이거 나중에 absolute가 추가될 수도 있어서 수정해야하려나?? */

  border-left: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  /* height: calc(100vh - 68px);
  overflow: auto; */
`;

export const DetailContent = styled.div`
  padding: 28px 32px;
  min-width: 784px;

  /* height: calc(100vh - 200px); */
`;
