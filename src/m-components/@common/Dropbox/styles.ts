import styled from '@emotion/styled';

export const Dropbox = styled.button<{ active: boolean; width: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ width }) => width};
  padding: 4px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  color: ${({ theme, active }) => (active ? theme.colors.secondary_900 : theme.colors.secondary_600)};
  border: 1px solid ${({ theme }) => theme.colors.secondary_400};
  ${({ theme }) => theme.font.body_02};
`;
