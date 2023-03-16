import React, { FC } from 'react';
import { USER } from '@/assets/icons/User';
import Modal from '@/common/Modal';
import * as Style from './styles';
import { ModalHandlerProps } from '../CreateGroupModal';

export const LoginModal: FC<ModalHandlerProps> = ({ modalHandler }) => {
  return (
    <Modal.Frame onClick={modalHandler}>
      <Modal.Header onClick={modalHandler}>로그인</Modal.Header>
      <Modal.Body>
        <Style.GuidePhrase>서비스 이용을 위해서는 로그인이 필요해요.</Style.GuidePhrase>
      </Modal.Body>
      <Style.LoginBlock>
        <button>{USER.KAKAO}</button>
        <Style.LinkTo to="/">
          <span>아직 회원이 아니신가요?</span>
          <Style.Text>회원가입</Style.Text>
        </Style.LinkTo>
      </Style.LoginBlock>
    </Modal.Frame>
  );
};
