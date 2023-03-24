import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setAccesToken } from '@/utils/acceessToken';
import { userState } from '@/store/userState';
import { kakaoSignUp } from '@/api/Auth';

const useSignUpMutation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  return useMutation(kakaoSignUp, {
    onSuccess: ({ content }) => {
      const { email, userId, accessToken } = content;
      setAccesToken(accessToken);
      setUser((prev) => ({
        ...prev,
        email,
        userId,
      }));

      navigate('/');
    },
    onError: (error) => {},
  });
};

export default useSignUpMutation;
