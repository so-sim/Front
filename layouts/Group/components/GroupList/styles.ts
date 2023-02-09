import styled from '@emotion/styled';

export const Layout = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border-right: 2px solid ${({ theme }) => theme.colors.neutral_200_b};
  padding: 24px;
  gap: 12px;
`;

export const EachGroup = styled.button`
  display: flex;
  width: 52px;
  height: 52px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  color: white;
  cursor: pointer;
`;

interface CoverProps {
  isSelected: boolean;
}
export const Cover = styled(EachGroup)<CoverProps>`
  position: absolute;
  background-color: ${(props) => (props.isSelected ? 'none' : props.theme.colors.primary_900)};
  opacity: ${(props) => (props.isSelected ? 'none' : '0.5')};
`;

export const CreateButton = styled(EachGroup)`
  background-color: ${({ theme }) => theme.colors.neutral_400_b};
`;
