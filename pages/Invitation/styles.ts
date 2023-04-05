import styled from '@emotion/styled';

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  ${({ theme }) => theme.font.display_01}
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const CoverColor = styled.span<{ coverColor: string }>`
  width: 24px;
  height: 24px;
  background-color: ${({ coverColor }) => coverColor};
`;

export const GroupName = styled.div`
  ${({ theme }) => theme.font.subhead_04};
  margin-bottom: 28px;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Footer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;
