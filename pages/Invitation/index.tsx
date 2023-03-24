import Button from '@/common/Button';
import { userState } from '@/store/userState';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import * as Style from './styles';
import { InvitationModal } from '@/common/Modal/InvitationModal';
import { AuthModal } from '@/common/Modal/LoginModal';
import { useGroupDetail } from '@/queries/Group';

const Invitation = () => {
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useRecoilValue(userState);

  const handleInvitationModal = () => {
    setShowInvitationModal((prev) => !prev);
  };

  const handleLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };

  const checkUserLoginStatus = () => {
    if (user.userId === null) {
      handleLoginModal();
    } else {
      handleInvitationModal();
    }
  };

  const groupId = Number(window.location.search.split('=')[1]);

  const { data, isSuccess } = useGroupDetail({ groupId });

  if (!isSuccess) return <p>모임을 찾을 수 없습니다.</p>;

  return (
    <Style.Background>
      <Button width="150px" height="42px" onClick={checkUserLoginStatus}>
        입장하기
      </Button>
      {showLoginModal && <AuthModal modalHandler={handleLoginModal} />}
      {showInvitationModal && <InvitationModal groupName={data.content.title} onClick={handleInvitationModal} />}
    </Style.Background>
  );
};

export default Invitation;
