import styled from '@emotion/styled';

export const Container = styled.div`
  width: 576px;
  margin: 0 auto;
  padding-top: 48px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.neutral_300_b};
  border-top: none;
  border-bottom: none;
`;

export const Title = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 24px;
  h2 {
    font-size: 28px;
    color: ${({ theme }) => theme.colors.secondary_900};
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

export const AdminContainer = styled.div`
  padding: 14px 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral_300_b};
`;

export const Tage = styled.div`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 4px 14px;
  height: 26px;
  background-color: ${({ theme }) => theme.colors.secondary_800};
  border-radius: 32px;
`;
