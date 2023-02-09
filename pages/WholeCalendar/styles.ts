import styled from '@emotion/styled';

export const Layout = styled.div`
  padding: 48px 32px;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  margin-top: 4px;
  justify-content: space-between;
  height: 40px;
  div {
    display: flex;
    align-items: center;
  }
`;

export const DateHeader = styled.div`
  margin-right: 12px;
  font-size: 28px;
`;

export const ArrowWrapper = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
`;

export const WeekDate = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  border-radius: 4px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.neutral_200_b};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  margin-bottom: 12px;
  div {
    width: 100%;
    text-align: center;
  }
`;
