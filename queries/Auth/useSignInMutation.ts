import { kakaoLogin } from '../../api/Auth/index';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const setAccesToken = (token: string) => {
  return localStorage.setItem('accessToken', token);
};
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

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
