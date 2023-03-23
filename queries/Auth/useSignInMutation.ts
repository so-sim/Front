import { kakaoLogin } from '../../api/Auth/index';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setAccesToken } from '@/utils/acceessToken';

const useSignInMutation = () => {
  const navigate = useNavigate();
  return useMutation(kakaoLogin, {
    onSuccess: ({ content }) => {
      setAccesToken(content.accessToken);
      navigate('/');
    },
    onError: (error) => {},
  });
};

export default useSignInMutation;
