import styled from '@emotion/styled';

export const Container = styled.div`
  height: calc(100vh - 310px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 0.5rem 0.5rem 0.5rem 0;

  border-radius: 0.25rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_300};
  }
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TextWrapper = styled.div`
  width: 100%;
`;

export const DateText = styled.p`
  ${({ theme }) => theme.font.caption};

  color: ${({ theme }) => theme.colors.secondary_500};
`;

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.125rem;
`;

export const DescriptionGround = styled.span`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const Division = styled.div`
  width: 1px;
  height: 10px;

  background-color: ${({ theme }) => theme.colors.neutral_400_b};
`;

export const DescriptionMemo = styled.span`
  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_600};
`;

export const AmountText = styled.p`
  margin: 0 0 0 auto;

  ${({ theme }) => theme.font.subhead_02};

  color: ${({ theme }) => theme.colors.secondary_900};
`;
