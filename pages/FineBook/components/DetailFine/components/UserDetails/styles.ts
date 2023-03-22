import styled from '@emotion/styled';

export const UserDetailsFrame = styled.div`
  box-shadow: 2px 0px 25px 7px rgba(156, 156, 156, 0.15);
  position: absolute;
  top: 0;
  background: white;
  width: 576px;
  right: 0;
  border-left: gray;
  height: 100%;
`;

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

export const UserDetailsContent = styled.div`
  margin: 48px 40px;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 54px;
  position: relative;
`;

export const Text = styled.span`
  ${({ theme }) => theme.font.subhead_04}
`;
