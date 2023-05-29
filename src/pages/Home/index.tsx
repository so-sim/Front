import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Banner, GroupSection, Footer } from '@/components/Home';
import * as Style from './styles';
import recentlyVisitedGroup from '@/utils/recentlyVisitedGroup';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { isExist, navigateToSavedGroup } = recentlyVisitedGroup('invite-group-id', navigate);

    if (isExist) navigateToSavedGroup();
  }, []);

  return (
    <Style.Main>
      <div>
        <Header />
        <Banner />
        <GroupSection />
      </div>
      <div>
        <Footer />
      </div>
    </Style.Main>
  );
};

export default Home;
