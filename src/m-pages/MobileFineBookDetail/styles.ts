import { Situation } from '@/types/event';
import styled from '@emotion/styled';

export const GroundBox = styled.div`
  padding: 4px 12px;
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  white-space: nowrap;
  ${({ theme }) => theme.font.body_01};
`;

export const TextArea = styled.textarea<{ disabled?: boolean }>`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.secondary_200};
  border-radius: 6px;
  height: 86px;
  padding: 8px 12px;
  overflow: hidden;
  resize: none;
  ${({ theme }) => theme.font.body_01}
  &:disabled {
    border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
  &:focus {
    outline: none;
  }
`;

export const PersonIcon = styled.span`
  height: 24px;
  margin-right: 12px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: calc(100% - 48px);

  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  left: 1.5rem;
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const SemiBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

export const BetweenBlock = styled(Block)`
  justify-content: space-between;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  width: 100%;

  position: relative;

  margin-bottom: 0.5rem;
`;

export const Text = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.font.subhead_03};
`;

export const GroundText = styled.span`
  ${({ theme }) => theme.font.subhead_02}
`;

export const StatusButton = styled.button<{ situation: Situation }>`
  display: flex;
  align-items: center;
  padding: 4px 18px;
  border: 2px solid ${({ theme, situation }) => (situation === '미납' ? theme.colors.red_600 : situation === '확인중' ? theme.colors.orange_600 : theme.colors.primary_600)};
  border-radius: 4px;
  background-color: ${({ theme, situation }) => (situation === '미납' ? theme.colors.red_200 : situation === '확인중' ? theme.colors.orange_200 : theme.colors.blue_200)};
  color: ${({ theme, situation }) => (situation === '미납' ? theme.colors.red_600 : situation === '확인중' ? theme.colors.orange_600 : theme.colors.primary_600)};
  ${({ theme }) => theme.font.subhead_02}
`;

export const ButtonBox = styled.span`
  gap: 4px;
`;

export const Date = styled.span`
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const AdminButton = styled.button`
  width: 60px;
  padding: 0 2px;
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_700};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const DropdownButton = styled.div`
  position: relative;
  vertical-align: center;
  display: flex;
  align-items: center;

  padding: 4px 12px;
  margin-right: 0;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.secondary_400};
  border-radius: 4px;
  cursor: pointer;
  justify-content: space-between;
  ${({ theme }) => theme.font.body_01};
`;

export const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const DetailFineTitle = styled.label`
  white-space: nowrap;
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const MemoWrapper = styled.div`
  display: flex;
  gap: 0.375rem;
`;

export const DetailFineMemoTitle = styled.label`
  margin-top: 0.375rem;

  white-space: nowrap;
  ${({ theme }) => theme.font.subhead_01};
  color: ${({ theme }) => theme.colors.secondary_900};
`;
