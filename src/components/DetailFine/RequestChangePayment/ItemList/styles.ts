import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Item = styled.li`
  display: flex;
  align-items: center;

  position: relative;

  padding: 12px 34px 12px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral_200_b};
`;

export const ItemTitle = styled.p``;

export const AmountConatiner = styled.p<{ isOpen?: boolean }>`
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

    transform: translate(0, -30%) rotate(-135deg);
    ${({ isOpen }) =>
      isOpen &&
      css`
        transform: translate(0, -70%) rotate(45deg);
      `}
  }
`;
