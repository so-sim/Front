import styled from '@emotion/styled';

export const Layout = styled.div`
  padding-top: 124px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
`;

export const TOSContainer = styled.div`
  padding: 32px;

  width: 476px;
  height: 414px;
  margin: auto;
  margin-top: 50px;
`;

export const TOSTitle = styled.h1`
  margin-bottom: 12px;
  gap: 8px;
  ${({ theme }) => theme.font.display_01};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const TOSSubTitle = styled.span`
  ${({ theme }) => theme.font.body_03};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const TOSList = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TOS = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 16px;
    height: 16px;
  }
  label {
    display: flex;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 8px;
  }
  padding: 8px 0;

  ${({ theme }) => theme.font.body_02};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const TOSLink = styled.a`
  margin: 0 0 0 auto;
  padding-right: 6px;
`;

export const TOSWhole = styled(TOS)`
  margin-bottom: 4px;

  ${({ theme }) => theme.font.subhead_03};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

export const TOSFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
