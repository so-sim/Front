export const copyInvitationLink = (groupId: number) => {
  const invitationLink = `${process.env.REACT_APP_SERVICE_URL}/invitation?groupId=${groupId}`;
  if (!groupId) return;
  navigator.clipboard.writeText(invitationLink).then(() => console.log('complete!'));
};
