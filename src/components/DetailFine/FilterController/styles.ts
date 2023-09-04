import styled from '@emotion/styled';

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 8px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
  margin-bottom: 8px;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterText = styled.div`
  margin-right: 8px;
`;

export const SituationButton = styled.button<{ isActive: boolean }>`
  height: 24px;
  width: 56px;
  background-color: ${({ theme, isActive }) => isActive && theme.colors.neutral_300_b};
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.secondary_800};
  ${({ theme }) => theme.font.subhead_01};
  &: hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;
  padding-right: 12px;
  margin-right: 12px;
  border-right: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Icon_LG = styled.span`
  height: 24px;
`;

export const SearchBar = styled.input`
  height: 24px;
  color: ${({ theme }) => theme.colors.secondary_800};
  ${({ theme }) => theme.font.body_02};
`;

export const SelectedMember = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.caption};
`;

export const SelectedNickname = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CancelButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Icon_SM = styled.div`
  height: 16px;
`;

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary_800};
  ${({ theme }) => theme.font.body_03};
`;

export const AmountTitle = styled.p`
  margin-top: 2px;
  ${({ theme }) => theme.font.body_01};
`;
export const Amount = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  margin-left: 8px;
  ${({ theme }) => theme.font.subhead_04};
`;

export const Amount_Unit = styled.span`
  margin-bottom: 2px;
  ${({ theme }) => theme.font.subhead_01};
`;
