import styled from '@emotion/styled';

export const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.secondary_200};
  background-color: 2px solid ${({ theme }) => theme.colors.secondary_100};
  border-radius: 4px;
  padding: 4px 12px;
  width: 148px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.secondary_200};
  border-radius: 6px;
  height: 86px;
  padding: 8px 12px;
  overflow: hidden;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export const Length = styled.span`
  color: ${({ theme }) => theme.colors.secondary_500};
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  position: relative;
  width: 100%;
`;
