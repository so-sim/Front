import React, { FC, useState } from 'react';
import { USER } from '@/assets/icons/User';
import Modal from '@/common/Modal';
import * as Style from './styles';
import { ModalHandlerProps } from '../CreateGroupModal';
import KaKaoLogin from '@/common/KakaoLogin';
import { NavLink } from 'react-router-dom';

const AUTH_TEXT = {
  SignIn: { title: '로그인', desc: '서비스 이용을 위해서는 로그인이 필요합니다.', linkText: '아직 회원이 아니신가요?', link: '회원가입' },
  SignUp: { title: '회원가입', desc: '', linkText: '이미 회원이신가요?', link: '로그인하기' },
};

export const AuthModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  const [authType, setAuthType] = useState<'SignIn' | 'SignUp'>('SignIn');

  const onChangeAuthType = () => {
    if (authType === 'SignIn') {
      setAuthType('SignUp');
    } else {
      setAuthType('SignIn');
    }
  };

  return (
    <Modal.Frame onClick={modalHandler} height={authType === 'SignIn' ? '284px' : '236px'}>
      <Modal.Header onClick={modalHandler}>{AUTH_TEXT[authType].title}</Modal.Header>
      <Modal.Body>
        {authType === 'SignIn' ? <Style.GuidePhrase>{AUTH_TEXT[authType].desc}</Style.GuidePhrase> : <>{AUTH_TEXT[authType].desc}</>}
        <Style.LoginBlock>{authType === 'SignIn' ? <KaKaoLogin>{USER.KAKAO_SIGNIN}</KaKaoLogin> : <KaKaoLogin>{USER.KAKAO_SIGNUP}</KaKaoLogin>}</Style.LoginBlock>
        <Style.Footer>
          <Style.Text>{AUTH_TEXT[authType].linkText}</Style.Text>
          <Style.LinkText onClick={onChangeAuthType}>{AUTH_TEXT[authType].link}</Style.LinkText>
        </Style.Footer>
      </Modal.Body>
    </Modal.Frame>
  );
};
