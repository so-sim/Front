import { ToastPopUp } from '@/components/@common/Toast';
import { TOAST_SUCCESS } from '@/constants/Toast';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useCopyInvitationLink = () => {
  const { groupId } = useParams();
  const [isCopied, setIsCopied] = useState(false);
  const invitationLink = `${process.env.REACT_APP_SERVICE_URL}/invitation?groupId=${groupId}`;

  const onSuccessCopy = () => {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 200);
  };

  useEffect(() => {
    if (isCopied) {
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.INVITE });
    }
  }, [isCopied]);

  return { invitationLink, onSuccessCopy };
};

export default useCopyInvitationLink;
