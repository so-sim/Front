import { useNavigate } from 'react-router-dom';

/**
 * 초대장을 받은 사용자가 로그인 상태가 아닐 때,
 * 로그인을 할 경우 서버에서 설정되어 있는 redirect URI 경로가 '/'이기 때문에
 * 사용자가 다시 한 번 초대장 주소를 주소창에 입력해야 하는 번거로움 발생
 *
 * '/' 경로에서 해당 값이 존재할 경우
 * 다시 해당 그룹의 초대장 페이지로 리다이렉트 해주기 위한 훅
 */
const useRecentlyVisitedGroup = () => {
  const navigate = useNavigate();

  const sessionId = 'invite-group-id';
  const getInviteGroupId = sessionStorage.getItem(sessionId);
  const isExist = getInviteGroupId ? true : false;

  const navigateToSavedGroup = () => {
    navigate(`/invitation?groupId=${getInviteGroupId}`);
  };

  const setGroupId = (groupId: string) => {
    sessionStorage.setItem(sessionId, groupId);
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

export default useRecentlyVisitedGroup;
