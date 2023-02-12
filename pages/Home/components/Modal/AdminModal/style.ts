import styled from '@emotion/styled';

export const Title = styled.div`
  margin-bottom: 16px;
`;

export const ButtonFrame = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  width: 100%;
`;

export const DeleteButton = styled.button`
  padding: 8px 14px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.red_200};
  color: ${({ theme }) => theme.colors.system_red_200};
`;
