// 무엇을 할 거야? =>
const recentlyVisitedGroup = (sessionId: string, navigate?: (path: string) => void) => {
  const getInviteGroupId = sessionStorage.getItem(sessionId);

  const isExist: boolean = getInviteGroupId ? true : false;

  const setGroupId = (groupId: string) => {
    sessionStorage.setItem(sessionId, groupId);
  };

  const navigateToSavedGroup = () => {
    navigate && navigate(`/invitation?groupId=${getInviteGroupId}`);
  };

  const removeGroupId = () => {
    sessionStorage.removeItem(sessionId);
  };

  return {
    isExist,
    navigateToSavedGroup,
    removeGroupId,
    setGroupId,
  };
};

export default recentlyVisitedGroup;
