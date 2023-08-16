import styled from '@emotion/styled';

export const Text = styled.span`
  display: flex;
  text-align: start;
  display: block;
  width: 100%;
  height: 32px;
  ${({ theme }) => theme.font.subhead_03}
`;

export const Email = styled.span`
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
  margin-bottom: 4px;
`;

export const WithDrwalBtn = styled.button`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  height: 32px;
  background: ${({ theme }) => theme.colors.neutral_200_b};
  border: 2px solid ${({ theme }) => theme.colors.neutral_400_b};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.secondary_900};
  ${({ theme }) => theme.font.subhead_01}
`;

export const Content = styled.div`
  margin: 24px 20px;
`;
