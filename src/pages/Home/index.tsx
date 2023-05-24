import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Banner, GroupSection, Footer } from '@/components/Home';
import * as Style from './styles';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('invite-group-id') !== null) {
      navigate(`/invitation?groupId=${sessionStorage.getItem('invite-group-id')}`);
    }
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
