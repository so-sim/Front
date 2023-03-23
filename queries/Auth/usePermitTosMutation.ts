import { permitTos } from '@/api/Auth';
import { userState } from '@/store/userState';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const usePermitTosMutation = () => {
  const navgiate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  return useMutation(permitTos, {
    onSuccess: () => {
      setUser((prev) => ({
        ...prev,
        isPermit: true,
      }));
      navgiate('/');
    },
  });
};

export default usePermitTosMutation;
