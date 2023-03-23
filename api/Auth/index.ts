import { SignUpResult } from './../../types/auth.d';
import { ServerResponse } from '@/types/serverResponse';
import api from '..';
import { setAccesToken } from '@/utils/acceessToken';

export const kakaoLogin = async (code: string): Promise<ServerResponse<SignUpResult>> => {
  const { data } = await api.post(`/login/oauth2/code/kakao?code=${code}`);
  setAccesToken(data.accessToken);
  return data;
};

export const reTakeToken = async (): Promise<ServerResponse<SignUpResult>> => {
  const { data } = await api.post('/login/reIssueToken');
  setAccesToken(data.accessToken);
  return data;
};

export const permitTos = async (): Promise<ServerResponse> => {
  const { data } = await api.patch('/login/permit');
  return data;
};
