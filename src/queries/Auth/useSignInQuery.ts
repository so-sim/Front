import { TOAST_SUCCESS, TOAST_ERROR } from './../../constants/Toast';
import { useNavigate } from 'react-router-dom';
import { kakaoSignIn } from './../../api/Auth/index';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/userState';
import { setAccesToken } from '@/utils/acceessToken';
import { AxiosError } from 'axios';
import { ToastPopUp } from '@/components/@common/Toast';
import { isMobile } from 'react-device-detect';

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
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.SIGNIN });
      if (isMobile) {
        console.log('hi');
        navigate('/m-home');
        // window.location.href = (process.env.REACT_APP_SERVICE_URL as string) + '/m-home';
        return;
      }

      navigate('/');
    },
    onError: (error) => {
      if ((error as AxiosError).response?.status === 404) {
        if (isMobile) {
          navigate('/m-tos');
          return;
        }
        navigate('/tos');
      }
    },
  });
};
