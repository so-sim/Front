import styled from '@emotion/styled';

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 30;
  top: 36px;
  width: fit-content;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.secondary_100};
`;

export const Title = styled.div`
  ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_03}
`;

export const Subtitle = styled.div`
  margin-bottom: 2px;
  ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.body_01}
`;

export const PeriodInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PeriodInput = styled.div`
  padding: 4px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.caption};
  cursor: pointer;
`;

export const PeriodHyphen = styled.div`
  padding: 4px;
  ${({ theme }) => theme.font.caption}
`;
