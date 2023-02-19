import React from 'react';
import { Header, Banner, GroupSection, Footer } from './components';
import Modal from '../../common/Modal';
import * as Style from './style';
import { AdminModal } from './components/Modal/AdminModal';
import { UserModal } from './components/Modal/UserModal';
import LoginModal from './components/Modal/LoginModal';
import { InviteModal } from './components/Modal/InviteModal';
import { FineBookModal } from '../FineBook/components/DetailFine/components/FineBookModal';
import { TwoButtonModal } from './components/Modal/TwoButtonModal';

const Home = () => {
  return (
    /** layout 자리 */
    <Style.Main>
      <Header />
      <Banner />
      <GroupSection />
      <Footer />
      {/* <FineBookModal /> */}
      {/* <TwoButtonModal
        isOpen={true}
        onClick={() => console.log('hi')}
        title="관리자 변경"
        description="관리자를 넘겨주시겠습니까?"
        firstBtn={{ text: '취소', onClick: () => console.log('hi') }}
        secondBtn={{ text: '변경하기', onClick: () => console.log('hi') }}
      /> */}
      {/* <AdminModal /> */}
      {/* <UserModal /> */}
      {/* <LoginModal /> */}
      {/* <InviteModal /> */}
    </Style.Main>
  );
};

export default Home;
