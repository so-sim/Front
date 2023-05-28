import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// 캘린더에서 내역 계속해서 추가하기를 했을 때 모달이 꺼지지 않고, 켜져 있어야 함
// 처음 렌더링 되었을 때 켜져있고, 그 이후 동작에 맡겨야 하기 때문에 아래 useEffect에서 state null로 바꿔줌
const useCheckLocationState = () => {
  const location = useLocation();
  useEffect(() => {
    window.history.replaceState(null, '');
  }, []);

  return location.state || false;
};

export default useCheckLocationState;
