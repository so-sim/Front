import styled from '@emotion/styled';

export const StatusButton = styled.button<{ status: string }>`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  margin: 8px 10px;
  border-radius: 16px;
  color: ${({ theme, status }) => (status === 'none' ? theme.colors.red_600 : status === 'checking' ? theme.colors.orange_600 : theme.colors.primary_600)};
  border: 2px solid ${({ theme, status }) => (status === 'none' ? theme.colors.red_600 : status === 'checking' ? theme.colors.orange_600 : theme.colors.primary_600)};
  background-color: ${({ theme, status }) => (status === 'none' ? theme.colors.red_200 : status === 'checking' ? theme.colors.orange_200 : theme.colors.blue_200)};
`;

export const Text = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 52px;
  margin-right: 4px;
`;

export const Icon = styled.span`
  width: 16px;
  height: 16px;
`;
