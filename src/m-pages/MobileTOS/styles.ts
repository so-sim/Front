import styled from '@emotion/styled';

type MobileDetect = { isMobile: boolean };

export const Layout = styled.div`
  padding: 0 24px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

export const TOSContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 4px;
  width: 312px;
  margin-top: 32px;
`;

export const TOSTitle = styled.h1`
  margin-bottom: 0;
  gap: 8px;
  ${({ theme }) => theme.font.subhead_04};
`;

export const TOSList = styled.div`
  margin-top: 12px;
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
`;

export const TOSLink = styled.a``;

export const TOSWhole = styled(TOS)`
  margin-bottom: 4px;
`;

export const TOSFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 24px;
`;
