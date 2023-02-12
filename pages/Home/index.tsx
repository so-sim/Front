import React from 'react';
import { Header, Banner, GroupSection, Footer } from './components';
import Modal from '../../common/Modal';
import * as Style from './style';
import { AdminModal } from './components/Modal/AdminModal';
import { UserModal } from './components/Modal/UserModal';
import LoginModal from './components/Modal/LoginModal';
import { InviteModal } from './components/Modal/InviteModal';

const Home = () => {
  return (
    /** layout 자리 */
    <Style.Main>
      <Header />
      <Banner />
      <GroupSection />
      <Footer />
      {/* <AdminModal /> */}
      {/* <UserModal /> */}
      {/* <LoginModal /> */}
      {/* <InviteModal /> */}
    </Style.Main>
  );
};

export default Home;
