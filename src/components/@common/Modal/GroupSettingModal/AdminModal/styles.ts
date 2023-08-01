import styled from '@emotion/styled';

export const Title = styled.div``;

export const Layout = styled.div`
  display: flex;
  width: 100%;
`;

export const Flex = styled.div`
  display: flex;
`;

export const SubTitle = styled.div<{ isSelected: boolean }>`
  width: 96px;
  padding: 4px;
  text-align: right;
  margin: 4px 20px 0 4px;
  white-space: nowrap;
  background: ${({ theme, isSelected }) => isSelected && theme.colors.neutral_300_b};
  cursor: pointer;
  ${({ theme }) => theme.font.subhead_03};

  &:hover {
    background: ${({ theme, isSelected }) => !isSelected && theme.colors.neutral_200_b};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-left: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  padding-left: 16px;
  gap: 24px;
`;

export const ButtonFrame = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  width: 100%;s
`;

export const DeleteButton = styled.button`
  ${({ theme }) => theme.font.subhead_01};
  padding: 5px 12px;
  border-radius: 4px;
  margin-top: 12px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const WithDrwal = styled.div`
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
  height: 32px;
  /* margin: 2px 0; */
  padding: 6px 12px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
`;

export const Nav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
