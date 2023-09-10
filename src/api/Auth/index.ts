import { SignUpResult } from './../../types/auth.d';
import { ServerResponse } from '@/types/serverResponse';
import api from '..';
import { removeAccessToken, setAccesToken } from '@/utils/acceessToken';
import { AxiosError } from 'axios';
import { KAKAO_URL } from '@/constants/Auth';

export const kakaoSignUp = async (code: string): Promise<ServerResponse<SignUpResult>> => {
  const { data } = await api.post(`/auth/kakao?code=${code}`);
  return data;
};

export const kakaoSignIn = async (code: string | null): Promise<ServerResponse<SignUpResult>> => {
  const { data } = await api.get(`/auth/kakao?code=${code}`);
  return data;
};

export const logoutUser = async (): Promise<ServerResponse> => {
  try {
    const { data } = await api.post('/auth/logout');
    removeAccessToken();
    window.location.href = process.env.REACT_APP_SERVICE_URL as string;
    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const reTakeToken = async (): Promise<ServerResponse> => {
  try {
    const response = await api.get('/auth/refresh');
    const accessToken = response.data.content.accessToken;
    setAccesToken(accessToken);
    return response.data;
  } catch (error) {
    const { response } = error as unknown as AxiosError<ServerResponse>;
    const code = response?.data.status.code;
    if (code === 1200) {
      window.location.href = KAKAO_URL.SIGIN;
    }
    if (response?.status === 406 || response?.status === 401) {
      removeAccessToken();
      window.location.href = process.env.REACT_APP_SERVICE_URL as string;
    }
    throw error;
  }
};
