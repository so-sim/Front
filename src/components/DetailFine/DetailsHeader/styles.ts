import styled from '@emotion/styled';

export const DetailsHeader = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 12px 32px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  min-width: 784px;
  width: 100%;
  z-index: 3;
  background-color: white;
  div {
    height: 24px;
  }
`;

export const BackArrowIcon = styled.button`
  height: 24px;
  margin-right: 4px;
  cursor: pointer;
`;

export const Title = styled.span`
  ${({ theme }) => theme.font.body_02}
`;

export const HeaderAlign = styled.div`
  display: flex;
  align-items: center;
`;
