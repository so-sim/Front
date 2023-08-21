import MobileLayout from '@/layouts/Mobile/MobileLayout';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import { Header } from '../Home';

const Page404 = () => {
  return (
    <>
      {isMobile ? (
        <MobileLayout location="GROUP">
          <Main />
        </MobileLayout>
      ) : (
        <>
          <Header /> <Main />
        </>
      )}
    </>
  );
};

export default Page404;

const Main = () => {
  return (
    <Container>
      <Title>
        요청하신 페이지를 <br /> 찾을 수 없습니다.
      </Title>
      <Button>메인으로 가기</Button>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin-top: 225px;
  margin-bottom: 2.5rem;
  ${({ theme }) => theme.font.subhead_04};
  color: ${({ theme }) => theme.colors.secondary_900};
`;

const Button = styled.button`
  padding: 11px 31px;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.primary_500};
  ${({ theme }) => theme.font.subhead_02};
  color: white;
`;
