import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  ${({ theme }) => theme.font.subhead_02}
`;

export const Dropbox = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  color: ${({ theme, active }) => (active ? theme.colors.secondary_900 : theme.colors.secondary_600)};
  border: 1px solid ${({ theme }) => theme.colors.secondary_400};
  ${({ theme }) => theme.font.body_02};
`;

export const Input = styled.input`
  width: 100%;
  padding: 4px 12px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.secondary_900};
  border: 1px solid ${({ theme }) => theme.colors.secondary_400};
  ${({ theme }) => theme.font.body_02};
`;

export const SituationButton = styled.button<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme, active }) => (active ? theme.colors.secondary_800 : theme.colors.secondary_400)};
  color: ${({ theme, active }) => (active ? theme.colors.secondary_800 : theme.colors.secondary_600)};
  ${({ theme }) => theme.font.subhead_02};
  transition: all 0.2s ease-in-out;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 108px;
  padding: 4px 12px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.secondary_900};
  border: 1px solid ${({ theme }) => theme.colors.secondary_400};
  ${({ theme }) => theme.font.body_02};
`;

export const TextareaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
  & > div {
    color: ${({ theme }) => theme.colors.secondary_500};
    ${({ theme }) => theme.font.caption};
  }
`;
