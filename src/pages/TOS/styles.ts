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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  gap: 4px;
  width: 476px;
  height: 414px;
  margin: auto;
  margin-top: 50px;
`;

export const TOSTitle = styled.h1`
  margin-bottom: 12px;
  gap: 8px;
  ${({ theme }) => theme.font.headline};
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
`;

export const TOSLink = styled.a``;

export const TOSWhole = styled(TOS)`
  margin-bottom: 4px;
`;

export const TOSFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
