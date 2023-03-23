import { useNavigate } from 'react-router-dom';
import { kakaoSignIn } from './../../api/Auth/index';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/userState';
import { setAccesToken } from '@/utils/acceessToken';
import { AxiosError } from 'axios';

export const useSignInQuery = (code: string | null) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  return useQuery(['signIn'], () => kakaoSignIn(code), {
    enabled: !!code,
    retry: 0,
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
    onError: (error) => {
      if ((error as AxiosError).response?.status === 404) {
        navigate('/tos');
      }
    },
  });
};
