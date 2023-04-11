import styled from '@emotion/styled';

export const Flex = styled.div`
  display: flex;
`;
export const SubTitle = styled.span`
  ${({ theme }) => theme.font.subhead_03};
  white-space: nowrap;
  margin-right: 20px;
`;

export const ConfigContainer = styled.div`
  width: 100%;
  border-left: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  padding-left: 8px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0px 12px;
  span {
    width: 100%;
  }
`;

export const Text = styled.span`
  display: flex;
  text-align: start;
  display: block;
  width: 100%;
  height: 32px;
  ${({ theme }) => theme.font.subhead_03}
`;

export const Email = styled(Text)`
  ${({ theme }) => theme.font.body_01}
`;

export const Kakao = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px;
  width: 152px;
  height: 32px;
  background: #ffe600;
  border-radius: 6px;
`;

export const WithDrwalBtn = styled.button`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  height: 32px;
  background: ${({ theme }) => theme.colors.neutral_200_b};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  ${({ theme }) => theme.font.subhead_01}
`;
