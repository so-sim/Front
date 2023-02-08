import React from 'react';
import { Header, Banner, GroupSection, Footer } from './components';
import Modal from '../../common/Modal';
import { Layout } from './layouts';

const Home = () => {
  return (
    /** layout 자리 */
    <Layout>
      <Header />
      <Banner />
      <GroupSection />
      <Footer />
      {/* <Modal.Frame isOpen={true} onClick={() => console.log('hi')}>
        <Modal.Header>모임 만들기</Modal.Header>
        <Modal.Body>
          <input type="text" />
        </Modal.Body>
      </Modal.Frame> */}
    </Layout>
  );
};

export default Home;
