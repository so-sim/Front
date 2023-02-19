import styled from '@emotion/styled';
import { Status } from './index';

export const DetailFineFrame = styled.section`
  border-left: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  position: relative;
`;

export const DetailsHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 48px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  div {
    height: 24px;
  }
`;

export const TableRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 100px 120px 116px 108px 1fr;
  border-top: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
  & > span {
    padding: 8px 16px;
  }
`;

export const DateController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const ArrowWrapper = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const TodayButton = styled.button`
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
`;

export const FilterButton = styled.button<{ last?: boolean }>`
  padding: 4px 12px;
  border-right: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border: ${({ last }) => last && 'none'};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const FilterWrapper = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 12px;
  overflow: hidden;
`;

export const BackArrowIcon = styled.span`
  height: 24px;
  margin-right: 4px;
  cursor: pointer;
`;
