import styled from '@emotion/styled';
import theme from '../../../../../styles/Theme';

export const Frame = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GroupName = styled.div`
  display: flex;
  padding: 10px 8px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border-radius: 2px;
`;

export const GroupColor = styled.div`
  margin-right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.red_100};
`;

export const QuitButton = styled.button`
  padding: 8px 14px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;
