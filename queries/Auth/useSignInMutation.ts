import { kakaoLogin } from '../../api/Auth/index';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useSignInMutation = () => {
  const navigate = useNavigate();
  return useMutation(kakaoLogin, {
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.token);
      navigate('/');
    },
    onError: (error) => {},
  });
};

export default useSignInMutation;
