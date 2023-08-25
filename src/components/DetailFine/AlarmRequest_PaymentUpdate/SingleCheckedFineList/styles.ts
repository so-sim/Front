import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

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

  margin-bottom: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0;

  border-radius: 0.25rem;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TextWrapper = styled.div`
  width: 100%;
`;

export const DateText = styled.p<{ $disabled?: boolean }>`
  ${({ theme }) => theme.font.caption};

  color: ${({ $disabled, theme }) => ($disabled ? theme.colors.secondary_600 : theme.colors.secondary_500)};
`;

export const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 0.125rem;
`;

export const DescriptionGround = styled.span<{ $disabled?: boolean }>`
  ${({ theme }) => (isMobile ? theme.font.subhead_01 : theme.font.subhead_02)};

  color: ${({ $disabled, theme }) => ($disabled ? theme.colors.secondary_600 : theme.colors.secondary_900)};
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

export const AmountText = styled.p<{ $disabled?: boolean }>`
  margin: 0 0 0 auto;

  ${({ theme }) => (isMobile ? theme.font.subhead_01 : theme.font.subhead_02)};

  color: ${({ $disabled, theme }) => ($disabled ? theme.colors.secondary_600 : theme.colors.secondary_900)};
`;
