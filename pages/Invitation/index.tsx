import Button from '@/common/Button';
import { userState } from '@/store/userState';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import * as Style from './styles';
import { InvitationModal } from '@/common/Modal/InvitationModal';
import { useGroupDetail } from '@/queries/Group';

const Invitation = () => {
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const user = useRecoilValue(userState);

  const handleInvitationModal = () => {
    setShowInvitationModal((prev) => !prev);
  };

  const groupId = Number(window.location.search.split('=')[1]);

  const { data, isSuccess } = useGroupDetail({ groupId });

  if (!isSuccess) return null;

  return (
    <Style.Background>
      <Button width="150px" height="42px" onClick={handleInvitationModal}>
        입장하기
      </Button>
      {showInvitationModal && <InvitationModal groupName={data.content.title} onClick={handleInvitationModal} />}
    </Style.Background>
  );
};

export default Invitation;
