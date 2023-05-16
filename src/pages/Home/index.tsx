import { userState } from '@/store/userState';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Header, Banner, GroupSection, Footer } from '@/components/Home';
import * as Style from './styles';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('invite-group-id') !== null) {
      navigate(`/invitation?groupId=${sessionStorage.getItem('invite-group-id')}`);
    }
  }, []);

  const user = useRecoilValue(userState);
  useEffect(() => {
    if (user.userId) {
      window.dataLayer.push({ user_id: user.userId });
    }
  }, [user.userId]);

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
