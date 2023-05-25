import Button from '@/components/@common/Button';
import { userState } from '@/store/userState';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import * as Style from './styles';
import { InvitationModal } from '@/components/@common/Modal/InvitationModal';
import { AuthModal } from '@/components/@common/Modal/LoginModal';
import { useGroupDetail } from '@/queries/Group';
import { InvitationTicket } from '@/assets/icons/Invitation';
import { useNavigate } from 'react-router-dom';
import { useQueryString } from '@/hooks/useQueryString';
import Loading from '@/components/Auth/Loading';
import { NotFoundGroup } from '@/components/Invitation/NotFoundGroup';
import recentlyVisitedGroup from '@/utils/recentlyVisitedGroup';

const Invitation = () => {
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const { removeGroupId, setGroupId } = recentlyVisitedGroup('invite-group-id', navigate);

  const { groupId } = useQueryString();

  const { data, isSuccess, isLoading } = useGroupDetail(Number(groupId));

  const handleInvitationModal = () => {
    setShowInvitationModal((prev) => !prev);
  };

  const handleLoginModal = () => {
    if (showLoginModal) removeGroupId();

    setShowLoginModal((prev) => !prev);
  };

  const checkUserLoginStatus = () => {
    if (isSuccess && data?.content.isInto === true) {
      return navigate(`/group/${groupId}/book`);
    }

    if (user.userId === null) {
      handleLoginModal();
      setGroupId(groupId);
    } else {
      handleInvitationModal();
    }
  };

  const cancelJoinGroup = () => {
    removeGroupId();
    navigate('/');
  };

  useEffect(() => {
    removeGroupId();
  }, []);

  if (isLoading) return <Loading />;

  if (!isSuccess) return <NotFoundGroup />;

  return (
    <Style.Background>
      <Style.Block>
        <Style.Title>
          <Style.CoverColor coverColor={data.content.coverColor} />
          <span>초대권</span>
        </Style.Title>
        <Style.GroupName>{data.content.title}</Style.GroupName>
        {InvitationTicket}
        <Style.Footer>
          <Button width="150px" height="42px" color="white" onClick={cancelJoinGroup}>
            거절하기
          </Button>
          <Button width="150px" height="42px" color="black" onClick={checkUserLoginStatus}>
            입장하기
          </Button>
        </Style.Footer>
      </Style.Block>
      {showLoginModal && <AuthModal modalHandler={handleLoginModal} />}
      {showInvitationModal && <InvitationModal groupName={data.content.title} onClick={handleInvitationModal} />}
    </Style.Background>
  );
};

export default Invitation;
