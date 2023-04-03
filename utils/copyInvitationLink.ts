import { TOAST_SUCCESS } from './../constants/Toast';
import { ToastPopUp } from './../common/Toast/index';
export const copyInvitationLink = (groupId: number) => {
  const invitationLink = `${process.env.REACT_APP_SERVICE_URL}/invitation?groupId=${groupId}`;
  if (!groupId) return;
  navigator.clipboard.writeText(invitationLink).then(() => ToastPopUp({ type: 'success', message: TOAST_SUCCESS.INVITE }));
};
