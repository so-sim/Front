import { SignUpResult } from './../../types/auth.d';
import { ServerResponse } from '@/types/serverResponse';
import api from '..';
import { setAccesToken } from '@/utils/acceessToken';

export const kakaoSignUp = async (code: string): Promise<ServerResponse<SignUpResult>> => {
  const { data } = await api.post(`/login/kakao?code=${code}`);
  return data;
};

export const kakaoSignIn = async (code: string | null): Promise<ServerResponse<SignUpResult>> => {
  const { data } = await api.get(`/login/kakao?code=${code}`);
  return data;
};

export const reTakeToken = async (): Promise<ServerResponse> => {
  const { data } = await api.get('/login/reissueToken');
  setAccesToken(data.content.accessToken);
  return data;
};
