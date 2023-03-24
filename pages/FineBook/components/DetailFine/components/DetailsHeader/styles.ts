import styled from '@emotion/styled';

export const DetailsHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 48px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  div {
    height: 24px;
  }
`;

export const BackArrowIcon = styled.span`
  height: 24px;
  margin-right: 4px;
  cursor: pointer;
`;

export const Title = styled.span``;

export const HeaderAlign = styled.div`
  display: flex;
  align-items: center;
`;
