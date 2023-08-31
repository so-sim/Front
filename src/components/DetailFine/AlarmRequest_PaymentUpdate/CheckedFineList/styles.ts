import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const ItemContainer = styled.li`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral_200_b};
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 12px;
  margin-bottom: 12px;

  padding-right: 34px;
`;

export const ItemTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  ${({ theme }) => theme.font.body_02};
`;

export const ItemAmount = styled.p<{ isOpen?: boolean }>`
  position: relative;

  margin: 0 0 0 auto;

  ${({ theme }) => theme.font.subhead_02}

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

export const Monetary_Unit = styled.span`
  margin-left: 0.125rem;
  ${({ theme }) => theme.font.caption}
`;

export const TextWrapper = styled.div`
  width: 100%;

  margin-bottom: 0.25rem;
  padding-left: 2.25rem;
  padding-right: 2.125rem;
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
  ${({ theme }) => (isMobile ? theme.font.subhead_01 : theme.font.subhead_02)};

  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const Division = styled.div`
  width: 1px;
  height: 10px;

  background-color: ${({ theme }) => theme.colors.neutral_400_b};
`;

export const DescriptionMemo = styled.span`
  ${({ theme }) => (isMobile ? theme.font.caption : theme.font.subhead_02)};

  color: ${({ theme }) => theme.colors.secondary_600};
`;

export const AmountText = styled.p`
  margin: 0 0 0 auto;

  ${({ theme }) => (isMobile ? theme.font.subhead_01 : theme.font.subhead_02)};

  color: ${({ theme }) => theme.colors.secondary_900};
`;
