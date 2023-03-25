import { useGroupDetail } from '@/queries/Group';
import { Header, Banner, GroupSection, Footer } from './components';
import * as Style from './styles';

const Home = () => {
  return (
    /** layout 자리 */
    <Style.Main>
      <Header />
      <Banner />
      <GroupSection />
      <Footer />
      {/* <TwoButtonModal
        isOpen={true}
        onClick={() => console.log('hi')}
        title="관리자 변경"
        description="관리자를 넘겨주시겠습니까?"
        firstBtn={{ text: '취소', onClick: () => console.log('hi') }}
        secondBtn={{ text: '변경하기', onClick: () => console.log('hi') }}
      /> */}
    </Style.Main>
  );
};

export default Home;
