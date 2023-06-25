import { useEffect } from 'react';
import { Header, Banner, GroupSection, Footer } from '@/components/Home';
import * as Style from './styles';
import useRecentlyVisitedGroup from '@/hooks/useRecentlyVisitedGroup';

const Home = () => {
  const { isExist, navigateToSavedGroup } = useRecentlyVisitedGroup();

  useEffect(() => {
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
