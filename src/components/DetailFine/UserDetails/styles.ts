import { Situation } from '@/types/event';
import styled from '@emotion/styled';

export const GroundBox = styled.div`
  padding: 4px 12px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  ${({ theme }) => theme.font.body_02};
`;

export const UserDetailsFrame = styled.div`
  box-shadow: 2px 0px 25px 7px rgba(156, 156, 156, 0.15);
  position: absolute;
  z-index: 4;
  top: 68px;
  background: white;
  width: 576px;
  right: 0;
  border-left: gray;
  height: calc(100% - 68px);
  border-left: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 40px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  div {
    height: 24px;
  }
  & > span {
    ${({ theme }) => theme.font.subhead_02};
  }
`;

export const TextArea = styled.textarea<{ disabled?: boolean }>`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.secondary_200};
  border-radius: 6px;
  height: 86px;
  padding: 8px 12px;
  overflow: hidden;
  resize: none;
  ${({ theme }) => theme.font.body_02}
  &:disabled {
    border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
  &:focus {
    outline: none;
  }
`;

export const CloseIcon = styled.span`
  height: 24px;
  margin-right: 4px;
  cursor: pointer;
`;

export const PersonIcon = styled.span`
  height: 32px;
  margin-right: 12px;
`;

export const Footer = styled.div`
  display: flex;
  gap: 12px;
  margin: 0 40px;
  justify-content: flex-end;
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const BetweenBlock = styled(Block)`
  justify-content: space-between;
`;

export const UserDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 40px;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
  position: relative;
`;

export const Text = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  ${({ theme }) => theme.font.subhead_04}
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
  ${({ theme }) => theme.font.subhead_03};
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const AdminButton = styled.button`
  width: 60px;
  padding: 0 2px;
  ${({ theme }) => theme.font.subhead_02};
  color: ${({ theme }) => theme.colors.secondary_700};
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;
