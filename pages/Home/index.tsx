import React from 'react';
import { Header, Banner, GroupSection, Footer } from './components';
import Modal from '../../common/Modal';
import * as Style from './style';

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
