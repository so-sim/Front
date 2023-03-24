import { useGroupDetail } from '@/queries/Group';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Calendar from '../../common/Calendar';
import { InviteModal } from '../FineBook/components/DetailFine/components/InviteModal';

const WholeCalendar = () => {
  const location = useLocation();
  const { groupId } = useParams();

  const { data } = useGroupDetail({ groupId: Number(groupId) });

  const isFirstVisit = JSON.parse(location.search.split('=')[1] || 'false');

  const isAdmin = data?.content.isAdmin;

  const [showInviteModal, setShowInviteModal] = useState(true);

  const handleGroupInviteModal = () => {
    setShowInviteModal((prev) => !prev);
  };

  return (
    <>
      <Calendar cellType="Tag" />
      {isAdmin && isFirstVisit && showInviteModal && <InviteModal onClick={handleGroupInviteModal} />}
    </>
  );
};

export default WholeCalendar;
