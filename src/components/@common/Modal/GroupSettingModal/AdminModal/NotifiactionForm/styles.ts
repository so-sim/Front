import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-left: ${({ theme }) => !isMobile && `2px solid ${theme.colors.neutral_400_b}`};
  padding-left: ${!isMobile && '16px'};
  height: 709px;
`;

export const Notice = styled.div`
  display: flex;
  gap: 4px;
  align-content: flex-end;
  padding: 8px 0;
  margin: 0 0 0 8px;
  text-align: start;
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.body_01}
`;

export const ToggleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const EnabledBox = styled.div<{ enabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  opacity: ${({ enabled }) => (enabled ? 1 : 0.6)};
  pointer-events: ${({ enabled }) => !enabled && 'none'};
`;

export const TabTitle = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_03}
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  margin-bottom: 4px;
  /* background-color: ${({ theme }) => theme.colors.neutral_200_b}; */
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_01}
`;

export const TabButtonBox = styled.ul`
  display: flex;
  flex: 1;
  width: 100%;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const PeriodTypeButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex: 1;
  width: 50px;
  padding: 8px 0;
  justify-content: center;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.secondary_900};
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.secondary_100 : '')};
`;

export const StartDateOfNotificationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 8px;
  margin-bottom: 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const TabBlock = styled.li`
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const BodySubTitle = styled.div`
  color: ${({ theme }) => theme.colors.secondary_700};
  ${({ theme }) => theme.font.body_01};
`;

export const Body2SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.body_02};
`;

export const ErrorText = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.system_red_200};
  ${({ theme }) => theme.font.caption}
`;
