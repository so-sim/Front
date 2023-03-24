import { useState } from 'react';
import Calendar from '../../common/Calendar';
import { InviteModal } from '../FineBook/components/DetailFine/components/InviteModal';

const WholeCalendar = () => {
  const isFirstVisit = JSON.parse(window.location.search.split('=')[1]);
  const [showInviteModal, setShowInviteModal] = useState(true);

  const handleGroupInviteModal = () => {
    setShowInviteModal((prev) => !prev);
  };

  return (
    <>
      <Calendar cellType="Tag" />
      {isFirstVisit && showInviteModal && <InviteModal onClick={handleGroupInviteModal} />}
    </>
  );
};

export default WholeCalendar;
