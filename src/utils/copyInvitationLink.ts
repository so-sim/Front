import { ToastPopUp } from '@/components/@common/Toast';
import { TOAST_SUCCESS } from './../constants/Toast';

export const copyInvitationLink = (groupId: number) => {
  const invitationLink = `${process.env.REACT_APP_SERVICE_URL}/invitation?groupId=${groupId}`;
  if (!groupId) return;
  navigator.clipboard.writeText(invitationLink).then(() => ToastPopUp({ type: 'success', message: TOAST_SUCCESS.INVITE }));
};
