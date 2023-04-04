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
    </Style.Main>
  );
};

export default Home;
