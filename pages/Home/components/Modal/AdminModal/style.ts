import styled from '@emotion/styled';

export const Title = styled.div`
  margin-bottom: 16px;
`;

export const ButtonFrame = styled.div`
  display: flex;
  margin-top: 12px;
  gap: 12px;
  justify-content: flex-end;
  width: 100%;
`;

export const DeleteButton = styled.button`
  padding: 8px 14px;
  border-radius: 4px;
  margin-top: 12px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;
