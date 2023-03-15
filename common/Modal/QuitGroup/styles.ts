import styled from '@emotion/styled';
import theme from '../../../styles/Theme';

export const Frame = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 32px;
`;

export const GroupName = styled.div`
  display: flex;
  width: 226px;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border-radius: 2px;
  ${({ theme }) => theme.font.body_02}
`;

export const QuitButton = styled.button`
  ${({ theme }) => theme.font.subhead_01};
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 28px;
  margin: 2px 0;
  padding: 6px 12px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;
