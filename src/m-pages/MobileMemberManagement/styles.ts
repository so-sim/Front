import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 1.25rem;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.neutral_300_b};
  border-top: none;
  border-bottom: none;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  h2 {
    font-size: 28px;
    color: ${({ theme }) => theme.colors.secondary_900};
    ${({ theme }) => theme.font.subhead_04};
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const ButtonFlex = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.font.subhead_02}
  color:${({ theme }) => theme.colors.secondary_900};
  height: 32px;
  padding: 4px 12px;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
`;

export const UserContainer = styled.div`
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
  ${({ theme }) => theme.font.subhead_01};
`;

export const UserIcon = styled.div`
  height: 32px;
`;

export const Tag = styled.div<{ $myTag?: boolean }>`
  color: ${({ theme, $myTag }) => ($myTag ? theme.colors.secondary_900 : theme.colors.white)};
  display: flex;
  align-items: center;
  padding: 4px 14px;
  height: 26px;
  background-color: ${({ theme, $myTag }) => ($myTag ? theme.colors.neutral_200_b : theme.colors.secondary_800)};
  border-radius: 32px;
  ${({ theme }) => theme.font.caption};
`;
