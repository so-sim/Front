import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setAccesToken } from '@/utils/acceessToken';
import { userState } from '@/store/userState';
import { kakaoLogin } from '@/api/Auth';

const useSignInMutation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  return useMutation(kakaoLogin, {
    onSuccess: ({ content }) => {
      const { email, userId, isPermit, accessToken } = content;
      setAccesToken(accessToken);
      setUser((prev) => ({
        ...prev,
        email,
        userId,
        isPermit,
      }));

      if (content.isPermit) {
        navigate('/');
      } else {
        navigate('/tos');
      }
    },
    onError: (error) => {},
  });
};

export default useSignInMutation;
