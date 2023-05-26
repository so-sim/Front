import { WITHDRAWAL_MODAL } from '@/constants/Withdrawal';
import { useCanWithdrawl } from '@/queries/Auth/useCanWithdrawal';
import { userState } from '@/store/userState';
import React, { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Modal from '..';
import { ConfirmModal } from '../ConfirmModal';
import * as Style from './styles';

interface UserConfigModalProps {
  handleModal: () => void;
}

const UserConfigModal: FC<UserConfigModalProps> = ({ handleModal }) => {
  const [showWithdrawalModal, setShowWithdarawalModal] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const userData = useRecoilValue(userState);

  const handleWithdrawalModal = () => {
    setShowWithdarawalModal((prev) => !prev);
  };
  const { data } = useCanWithdrawl({ modalHandler: handleWithdrawalModal, trigger });

  const onClickWithdrawal = () => {
    setTrigger(true);
  };

  return (
    <>
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
                <Style.Email>{userData.email}</Style.Email>
                <Style.WithDrwalBtn onClick={onClickWithdrawal}>회원 탈퇴</Style.WithDrwalBtn>
              </Style.ContentWrapper>
            </Style.ConfigContainer>
          </Style.Flex>
        </Modal.Body>
      </Modal.Frame>
      {showWithdrawalModal && <ConfirmModal type="WITHDRAWAL_HAS_ADMIN" width="448px" confirm={handleWithdrawalModal} modalHandler={handleWithdrawalModal} />}
    </>
  );
};

export default UserConfigModal;
