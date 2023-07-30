import styled from '@emotion/styled';

export const CommonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
`;

export const CommonTitle = styled.div`
  ${({ theme }) => theme.font.body_02}
`;

export const CommonBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CommonInput = styled.input`
  padding: 4px 8px;
  text-align: center;
  width: 42px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const CommonDateInput = styled.input`
  padding: 4px 8px;
  text-align: center;
  width: 100px;
  border: 1px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const Body = styled.span`
  text-align: start;
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.body_01}
`;

export const CommonDropBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0 12px; */
  width: 120px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_400};
  color: ${({ theme }) => theme.colors.secondary_900};
  cursor: pointer;
  ${({ theme }) => theme.font.body_02}
`;

export const CommonDropDown = styled.ul`
  position: absolute;
  top: -164px;
  overflow-y: scroll;
  width: 120px;
  height: 160px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  background-color: ${({ theme }) => theme.colors.secondary_100};
`;

export const CommonTime = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral_200_b};
  }
`;

export const TabTitle = styled.span`
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_03}
`;
