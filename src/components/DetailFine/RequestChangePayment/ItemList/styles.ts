import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ItemContainer = styled.li`
  padding-right: 34px;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral_200_b};
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  padding-top: 12px;
  padding-bottom: 12px;
`;

export const ItemTitle = styled.p``;

export const ItemAmount = styled.p<{ isOpen?: boolean }>`
  position: relative;

  margin: 0 0 0 auto;

  &:after {
    content: '';
    position: absolute;

    top: 50%;
    margin-left: 8px;

    border: solid ${({ theme }) => theme.colors.secondary_800};
    border-width: 0 2px 2px 0;
    padding: 0.25rem;

    transform: translate(0, -70%) rotate(45deg);

    ${({ isOpen }) =>
      isOpen &&
      css`
        transform: translate(0, -30%) rotate(-135deg);
      `}
  }
`;

export const ItemDetailList = styled.div`
  display: flex;

  padding-left: 66px;
`;

export const ItemDetailDate = styled.p`
  ${({ theme }) => theme.font.body_01}
  color:${({ theme }) => theme.colors.secondary_600};
`;

export const ItemDetailAmount = styled.p`
  ${({ theme }) => theme.font.subhead_01}
  margin: 0 0 0 auto;
`;
