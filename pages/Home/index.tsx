import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Banner, GroupSection, Footer } from './components';
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
      <Header />
      <Banner />
      <GroupSection />
      <Footer />
    </Style.Main>
  );
};

export default Home;
