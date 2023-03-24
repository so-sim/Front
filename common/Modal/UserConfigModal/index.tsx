import React, { FC } from 'react';
import Modal from '..';
import * as Style from './styles';

interface UserConfigModalProps {
  handleModal: () => void;
}

const UserConfigModal: FC<UserConfigModalProps> = ({ handleModal }) => {
  return (
    <Modal.Frame width="493px" height="284px" onClick={handleModal}>
      <Modal.Header align="start" onClick={handleModal}>
        환경설정
      </Modal.Header>
      <Modal.Body>
        <Style.Flex>
          <Style.SubTitle>사용자 설정</Style.SubTitle>
          <Style.ConfigContainer>
            <Style.ContentWrapper>
              <Style.Text>연동된 소셜 계정</Style.Text>
              <Style.Kakao>카카오 간편 로그인</Style.Kakao>
              <Style.Text>유저 이메일</Style.Text>
              <Style.WithDrwalBtn>회원 탈퇴</Style.WithDrwalBtn>
            </Style.ContentWrapper>
          </Style.ConfigContainer>
        </Style.Flex>
      </Modal.Body>
    </Modal.Frame>
  );
};

export default UserConfigModal;
