import React from 'react';
import Modal from '../../../../../common/Modal';
import * as Style from './styles';

const LoginModal = () => {
  return (
    <Modal.Frame isOpen={true} onClick={() => console.log('hi')}>
      <Modal.Header onClick={() => console.log('hi')}>로그인</Modal.Header>
      <Style.GuidePhrase>서비스 이용을 위해서는 로그인이 필요해요.</Style.GuidePhrase>
      <button>카카오 로그인</button>
      <Style.LinkTo to="/">카카오로 간편 회원가입</Style.LinkTo>
    </Modal.Frame>
  );
};

export default LoginModal;
