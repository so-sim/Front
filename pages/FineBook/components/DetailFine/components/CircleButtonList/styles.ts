import { PaymentType } from '@/types/event';
import styled from '@emotion/styled';

export const CircleButtonList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.secondary_100};
  box-shadow: 2px 0px 25px 7px rgba(156, 156, 156, 0.15);
`;

export const CircleButtonBox = styled.li`
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  &:first-child {
    background: ${({ theme }) => theme.colors.neutral_200_b};
  }
  &:last-child {
    border: none;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;
