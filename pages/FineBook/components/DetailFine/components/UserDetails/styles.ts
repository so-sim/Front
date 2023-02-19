import styled from '@emotion/styled';

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 48px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  div {
    height: 24px;
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
